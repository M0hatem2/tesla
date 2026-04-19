import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { Car as CarService } from '../../core/services/car';
import { Booking as BookingService } from '../../core/services/booking';
import { Toast } from '../../core/services/toast';

@Component({
  selector: 'app-dealer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8">Dealer Dashboard</h1>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card text-center">
            <div class="text-4xl font-bold text-primary mb-2">{{ stats.totalListings }}</div>
            <div class="text-gray-600">Active Listings</div>
          </div>
          <div class="card text-center">
            <div class="text-4xl font-bold text-accent mb-2">{{ stats.pendingBookings }}</div>
            <div class="text-gray-600">Pending Bookings</div>
          </div>
          <div class="card text-center">
            <div class="text-4xl font-bold text-green-600 mb-2">{{ stats.testDrives }}</div>
            <div class="text-gray-600">Test Drives</div>
          </div>
          <div class="card text-center">
            <div class="text-4xl font-bold text-yellow-600 mb-2">{{ stats.rating }}★</div>
            <div class="text-gray-600">Average Rating</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Sidebar -->
          <aside>
            <div class="card">
              <nav class="space-y-2">
                <button
                  (click)="activeTab = 'overview'"
                  [class.bg-primary]="activeTab === 'overview'"
                  [class.text-white]="activeTab === 'overview'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                >
                  📊 Overview
                </button>
                <button
                  (click)="activeTab = 'listings'"
                  [class.bg-primary]="activeTab === 'listings'"
                  [class.text-white]="activeTab === 'listings'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                >
                  🚗 My Listings
                </button>
                <button
                  (click)="activeTab = 'bookings'"
                  [class.bg-primary]="activeTab === 'bookings'"
                  [class.text-white]="activeTab === 'bookings'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                >
                  📅 Bookings
                </button>
                <a routerLink="/cars" class="block px-4 py-2 rounded hover:bg-gray-100">
                  ➕ Add New Car
                </a>
              </nav>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="lg:col-span-2">
            @if (activeTab === 'overview') {
              <div class="card">
                <h2 class="text-2xl font-bold mb-6">Overview</h2>
                <div class="space-y-4">
                  <div class="p-4 bg-blue-50 rounded-lg">
                    <h3 class="font-semibold mb-2">Welcome back!</h3>
                    <p class="text-sm text-gray-700">
                      You have {{ stats.pendingBookings }} pending booking requests
                    </p>
                  </div>

                  <div>
                    <h3 class="font-semibold mb-3">Recent Activity</h3>
                    <div class="space-y-2">
                      <div class="text-sm p-3 bg-gray-50 rounded">
                        New booking request for BMW X5
                      </div>
                      <div class="text-sm p-3 bg-gray-50 rounded">
                        New review received (5 stars)
                      </div>
                      <div class="text-sm p-3 bg-gray-50 rounded">
                        Car listing viewed 45 times today
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }

            @if (activeTab === 'listings') {
              <div class="card">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-2xl font-bold">My Listings</h2>
                  <button class="btn-primary">+ Add New Car</button>
                </div>

                <div class="space-y-4">
                  @for (car of dealerCars; track car.id) {
                    <div class="border rounded-lg p-4 flex gap-4">
                      <img [src]="car.images[0]" class="w-24 h-20 object-cover rounded" />
                      <div class="flex-1">
                        <h3 class="font-bold">{{ car.make }} {{ car.model }}</h3>
                        <p class="text-primary font-bold">\${{ car.price.toLocaleString() }}</p>
                        <span class="badge-success text-xs">{{ car.status }}</span>
                      </div>
                      <div class="flex flex-col gap-2">
                        <button class="btn-secondary text-xs">Edit</button>
                        <button class="btn-danger text-xs">Delete</button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }

            @if (activeTab === 'bookings') {
              <div class="card">
                <h2 class="text-2xl font-bold mb-6">Booking Requests</h2>

                <div class="space-y-4">
                  @for (booking of dealerBookings; track booking.id) {
                    <div class="border rounded-lg p-4">
                      <div class="flex justify-between items-start mb-3">
                        <div>
                          <h3 class="font-bold">{{ booking.customerName }}</h3>
                          <p class="text-sm text-gray-600">
                            {{ booking.date }} at {{ booking.timeSlot }}
                          </p>
                          <p class="text-sm text-gray-600">📞 {{ booking.customerPhone }}</p>
                        </div>
                        <span
                          [class]="
                            booking.status === 'confirmed'
                              ? 'badge-success'
                              : booking.status === 'pending'
                                ? 'badge-warning'
                                : 'badge-danger'
                          "
                        >
                          {{ booking.status }}
                        </span>
                      </div>

                      @if (booking.status === 'pending') {
                        <div class="flex gap-2">
                          <button
                            (click)="confirmBooking(booking.id)"
                            class="btn-primary text-sm flex-1"
                          >
                            ✓ Confirm
                          </button>
                          <button
                            (click)="rejectBooking(booking.id)"
                            class="btn-danger text-sm flex-1"
                          >
                            ✕ Reject
                          </button>
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
            }
          </main>
        </div>
      </div>
    </div>
  `,
})
export class DealerDashboardComponent implements OnInit {
  activeTab = 'overview';
  dealerCars: any[] = [];
  dealerBookings: any[] = [];

  stats = {
    totalListings: 0,
    pendingBookings: 0,
    testDrives: 0,
    rating: 4.8,
  };

  constructor(
    private authService: Auth,
    private carService: CarService,
    private bookingService: BookingService,
    private toastService: Toast,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.loadDealerData();
    }
  }

  loadDealerData(): void {
    this.dealerCars = this.carService.getAllCars().slice(0, 5);
    this.dealerBookings = this.bookingService.getAllBookings().slice(0, 5);

    this.stats.totalListings = this.dealerCars.length;
    this.stats.pendingBookings = this.dealerBookings.filter((b) => b.status === 'pending').length;
    this.stats.testDrives = this.dealerBookings.filter((b) => b.status === 'completed').length;
  }

  confirmBooking(id: string): void {
    this.bookingService.confirmBooking(id);
    this.toastService.success('Booking confirmed!');
    this.loadDealerData();
  }

  rejectBooking(id: string): void {
    this.bookingService.rejectBooking(id, 'Not available');
    this.toastService.success('Booking rejected');
    this.loadDealerData();
  }
}
