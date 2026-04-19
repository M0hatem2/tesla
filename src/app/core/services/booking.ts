import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Booking as BookingModel, BookingData } from '../../models/booking.model';
import { BOOKINGS_DATA } from '../../data/bookings.data';

@Injectable({
  providedIn: 'root',
})
export class Booking {
  private readonly STORAGE_KEY = 'carhub_bookings';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeBookings();
  }

  private initializeBookings(): void {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(BOOKINGS_DATA));
    }
  }

  private getBookings(): BookingModel[] {
    if (!this.isBrowser) return BOOKINGS_DATA;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveBookings(bookings: BookingModel[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
  }

  createBooking(data: BookingData): BookingModel {
    const bookings = this.getBookings();

    const newBooking: BookingModel = {
      ...data,
      id: Date.now().toString(),
      userId: data.customerEmail,
      status: 'pending',
      createdAt: new Date().toISOString(),
      referenceNumber: `TD-${new Date().getFullYear()}-${String(bookings.length + 1).padStart(3, '0')}`,
    };

    bookings.push(newBooking);
    this.saveBookings(bookings);

    return newBooking;
  }

  getBookingsByUser(userId: string): BookingModel[] {
    return this.getBookings().filter((b) => b.userId === userId);
  }

  getBookingsByDealer(dealerId: string): BookingModel[] {
    return this.getBookings().filter((b) => b.dealerId === dealerId);
  }

  getAllBookings(): BookingModel[] {
    return this.getBookings();
  }

  getBookingById(id: string): BookingModel | undefined {
    return this.getBookings().find((b) => b.id === id);
  }

  cancelBooking(bookingId: string): void {
    const bookings = this.getBookings();
    const index = bookings.findIndex((b) => b.id === bookingId);

    if (index !== -1) {
      bookings[index].status = 'cancelled';
      this.saveBookings(bookings);
    }
  }

  confirmBooking(bookingId: string): void {
    const bookings = this.getBookings();
    const index = bookings.findIndex((b) => b.id === bookingId);

    if (index !== -1) {
      bookings[index].status = 'confirmed';
      this.saveBookings(bookings);
    }
  }

  rejectBooking(bookingId: string, reason: string): void {
    const bookings = this.getBookings();
    const index = bookings.findIndex((b) => b.id === bookingId);

    if (index !== -1) {
      bookings[index].status = 'rejected';
      bookings[index].rejectionReason = reason;
      this.saveBookings(bookings);
    }
  }

  completeBooking(bookingId: string): void {
    const bookings = this.getBookings();
    const index = bookings.findIndex((b) => b.id === bookingId);

    if (index !== -1) {
      bookings[index].status = 'completed';
      this.saveBookings(bookings);
    }
  }

  getAvailableSlots(carId: string, date: string): string[] {
    const allSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'];
    const bookings = this.getBookings();

    const bookedSlots = bookings
      .filter((b) => b.carId === carId && b.date === date && b.status !== 'cancelled')
      .map((b) => b.timeSlot);

    return allSlots.filter((slot) => !bookedSlots.includes(slot));
  }
}
