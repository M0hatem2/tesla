import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car as CarService } from '../../../../core/services/car';
import { Booking as BookingService } from '../../../../core/services/booking';
import { Dealer as DealerService } from '../../../../core/services/dealer';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Total Users</p>
              <p class="text-3xl font-bold text-primary">{{ stats.totalUsers }}</p>
            </div>
            <div class="text-4xl">👥</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Total Cars</p>
              <p class="text-3xl font-bold text-accent">{{ stats.totalCars }}</p>
            </div>
            <div class="text-4xl">🚗</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Total Bookings</p>
              <p class="text-3xl font-bold text-green-600">{{ stats.totalBookings }}</p>
            </div>
            <div class="text-4xl">📅</div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm">Total Dealers</p>
              <p class="text-3xl font-bold text-yellow-600">{{ stats.totalDealers }}</p>
            </div>
            <div class="text-4xl">🏢</div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Recent Bookings</h2>
          <div class="space-y-3">
            @for (booking of recentBookings; track booking.id) {
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div class="font-semibold">{{ booking.customerName }}</div>
                  <div class="text-sm text-gray-600">{{ booking.date }}</div>
                </div>
                <span [class]="booking.status === 'confirmed' ? 'badge-success' : 'badge-warning'">
                  {{ booking.status }}
                </span>
              </div>
            }
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Popular Cars</h2>
          <div class="space-y-3">
            @for (car of popularCars; track car.id) {
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <img [src]="car.images[0]" class="w-16 h-12 object-cover rounded" />
                <div class="flex-1">
                  <div class="font-semibold">{{ car.make }} {{ car.model }}</div>
                  <div class="text-sm text-gray-600">{{ car.reviewCount }} reviews</div>
                </div>
                <div class="text-yellow-500">{{ car.rating }}★</div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
    totalDealers: 0,
  };

  recentBookings: any[] = [];
  popularCars: any[] = [];

  constructor(
    private carService: CarService,
    private bookingService: BookingService,
    private dealerService: DealerService,
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    const cars = this.carService.getAllCars();
    const bookings = this.bookingService.getAllBookings();
    const dealers = this.dealerService.getAllDealers();

    this.stats.totalUsers = 150; // Mock data
    this.stats.totalCars = cars.length;
    this.stats.totalBookings = bookings.length;
    this.stats.totalDealers = dealers.length;

    this.recentBookings = bookings.slice(0, 5);
    this.popularCars = cars.sort((a, b) => b.rating - a.rating).slice(0, 5);
  }
}
