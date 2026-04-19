import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../../core/services/booking';
import { Car } from '../../../core/services/car';
import { Auth } from '../../../core/services/auth';
import { Booking as BookingModel } from '../../../models/booking.model';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeAgoPipe],
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">📅 Manage Bookings</h1>
          <p class="text-gray-600 mt-2">View and manage all test drive bookings</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="filterBookings()"
            placeholder="Search by name, email..."
            class="input-field"
          />
          <select [(ngModel)]="filterStatus" (ngModelChange)="filterBookings()" class="input-field">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            [(ngModel)]="filterDate"
            (ngModelChange)="filterBookings()"
            class="input-field"
          />
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="text-gray-600 text-sm">Total Bookings</div>
          <div class="text-3xl font-bold text-gray-800 mt-2">{{ allBookings.length }}</div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Pending</div>
          <div class="text-3xl font-bold text-yellow-600 mt-2">
            {{ allBookings.filter((b) => b.status === 'pending').length }}
          </div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Confirmed</div>
          <div class="text-3xl font-bold text-green-600 mt-2">
            {{ allBookings.filter((b) => b.status === 'confirmed').length }}
          </div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Completed</div>
          <div class="text-3xl font-bold text-blue-600 mt-2">
            {{ allBookings.filter((b) => b.status === 'completed').length }}
          </div>
        </div>
      </div>

      <!-- Bookings Table -->
      <div class="card overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Booking ID</th>
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Customer</th>
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Car</th>
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Date & Time</th>
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Created</th>
              <th class="text-right py-4 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (booking of filteredBookings; track booking.id) {
              <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-4 px-4">
                  <div class="font-mono text-sm text-gray-600">#{{ booking.id.slice(0, 8) }}</div>
                </td>
                <td class="py-4 px-4">
                  <div class="font-semibold text-gray-800">{{ booking.customerName }}</div>
                  <div class="text-sm text-gray-600">{{ booking.customerEmail }}</div>
                  <div class="text-sm text-gray-600">{{ booking.customerPhone }}</div>
                </td>
                <td class="py-4 px-4">
                  <div class="font-semibold text-gray-800">{{ getCarName(booking.carId) }}</div>
                </td>
                <td class="py-4 px-4">
                  <div class="font-semibold text-gray-800">{{ booking.date }}</div>
                  <div class="text-sm text-gray-600">{{ booking.timeSlot }}</div>
                </td>
                <td class="py-4 px-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                    [ngClass]="{
                      'bg-yellow-100 text-yellow-700': booking.status === 'pending',
                      'bg-green-100 text-green-700': booking.status === 'confirmed',
                      'bg-blue-100 text-blue-700': booking.status === 'completed',
                      'bg-red-100 text-red-700': booking.status === 'cancelled',
                    }"
                  >
                    {{ booking.status }}
                  </span>
                </td>
                <td class="py-4 px-4 text-gray-600 text-sm">
                  {{ booking.createdAt | timeAgo }}
                </td>
                <td class="py-4 px-4">
                  <div class="flex justify-end gap-2">
                    @if (booking.status === 'pending') {
                      <button
                        (click)="updateStatus(booking.id, 'confirmed')"
                        class="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm"
                      >
                        Confirm
                      </button>
                    }
                    @if (booking.status === 'confirmed') {
                      <button
                        (click)="updateStatus(booking.id, 'completed')"
                        class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                      >
                        Complete
                      </button>
                    }
                    @if (booking.status !== 'cancelled' && booking.status !== 'completed') {
                      <button
                        (click)="updateStatus(booking.id, 'cancelled')"
                        class="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                      >
                        Cancel
                      </button>
                    }
                    <button
                      (click)="viewDetails(booking)"
                      class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="7" class="py-12 text-center text-gray-500">
                  <div class="text-6xl mb-4">📅</div>
                  <p>No bookings found</p>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class ManageBookingsComponent implements OnInit {
  allBookings: BookingModel[] = [];
  filteredBookings: BookingModel[] = [];

  searchQuery = '';
  filterStatus = '';
  filterDate = '';

  constructor(
    private bookingService: Booking,
    private carService: Car,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.allBookings = this.bookingService.getAllBookings();
    this.filterBookings();
  }

  filterBookings(): void {
    this.filteredBookings = this.allBookings.filter((booking) => {
      const matchesSearch =
        !this.searchQuery ||
        booking.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = !this.filterStatus || booking.status === this.filterStatus;
      const matchesDate = !this.filterDate || booking.date === this.filterDate;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  getCarName(carId: string): string {
    const car = this.carService.getCarById(carId);
    return car ? `${car.year} ${car.make} ${car.model}` : 'Unknown Car';
  }

  updateStatus(bookingId: string, status: string): void {
    // TODO: Implement in service
    console.log('Update status:', bookingId, status);
    this.loadData();
  }

  viewDetails(booking: BookingModel): void {
    alert(
      `Booking Details:\n\nID: ${booking.id}\nCustomer: ${booking.customerName}\nEmail: ${booking.customerEmail}\nPhone: ${booking.customerPhone}\nCar: ${this.getCarName(booking.carId)}\nDate: ${booking.date}\nTime: ${booking.timeSlot}\nStatus: ${booking.status}\n\nSpecial Requests: ${booking.specialRequests || 'None'}`,
    );
  }
}
