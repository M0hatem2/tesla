import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { Booking as BookingService } from '../../core/services/booking';
import { Favorite } from '../../core/services/favorite';
import { User } from '../../models/user.model';
import { Booking } from '../../models/booking.model';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-8">My Dashboard</h1>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Sidebar -->
          <aside class="lg:col-span-1">
            <div class="card">
              <div class="text-center mb-4">
                <div
                  class="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-3"
                >
                  {{ getUserInitials() }}
                </div>
                <h3 class="font-bold text-lg">{{ user?.fullName }}</h3>
                <p class="text-sm text-gray-600">{{ user?.email }}</p>
              </div>

              <nav class="space-y-2">
                <button
                  (click)="activeTab = 'profile'"
                  [class.bg-primary]="activeTab === 'profile'"
                  [class.text-white]="activeTab === 'profile'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                >
                  👤 My Profile
                </button>
                <button
                  (click)="activeTab = 'bookings'"
                  [class.bg-primary]="activeTab === 'bookings'"
                  [class.text-white]="activeTab === 'bookings'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                >
                  📅 My Bookings
                </button>
                <button
                  (click)="activeTab = 'favorites'"
                  [class.bg-primary]="activeTab === 'favorites'"
                  [class.text-white]="activeTab === 'favorites'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                >
                  ❤️ Saved Cars
                </button>
                <button
                  (click)="activeTab = 'brochures'"
                  [class.bg-primary]="activeTab === 'brochures'"
                  [class.text-white]="activeTab === 'brochures'"
                  class="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
                >
                  📄 Brochures
                </button>
              </nav>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="lg:col-span-3">
            @if (activeTab === 'profile') {
              <div class="card">
                <h2 class="text-2xl font-bold mb-6">My Profile</h2>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-semibold mb-2">Full Name</label>
                    <input type="text" [value]="user?.fullName" class="input-field" readonly />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2">Email</label>
                    <input type="email" [value]="user?.email" class="input-field" readonly />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2">Phone</label>
                    <input type="tel" [value]="user?.phone" class="input-field" readonly />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2">City</label>
                    <input
                      type="text"
                      [value]="user?.city || 'Not specified'"
                      class="input-field"
                      readonly
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold mb-2">Member Since</label>
                    <input type="text" [value]="user?.createdAt" class="input-field" readonly />
                  </div>
                </div>
              </div>
            }

            @if (activeTab === 'bookings') {
              <div class="card">
                <h2 class="text-2xl font-bold mb-6">My Bookings</h2>

                @if (bookings.length === 0) {
                  <div class="text-center py-12">
                    <div class="text-6xl mb-4">📅</div>
                    <p class="text-gray-600 mb-4">No bookings yet</p>
                    <a routerLink="/cars" class="btn-primary">Browse Cars</a>
                  </div>
                } @else {
                  <div class="space-y-4">
                    @for (booking of bookings; track booking.id) {
                      <div class="border rounded-lg p-4">
                        <div class="flex justify-between items-start mb-2">
                          <div>
                            <h3 class="font-bold">Booking #{{ booking.referenceNumber }}</h3>
                            <p class="text-sm text-gray-600">
                              {{ booking.date }} at {{ booking.timeSlot }}
                            </p>
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
                        <p class="text-gray-700">{{ booking.customerName }}</p>
                      </div>
                    }
                  </div>
                }
              </div>
            }

            @if (activeTab === 'favorites') {
              <div class="card">
                <h2 class="text-2xl font-bold mb-6">Saved Cars</h2>

                @if (favoriteCars.length === 0) {
                  <div class="text-center py-12">
                    <div class="text-6xl mb-4">❤️</div>
                    <p class="text-gray-600 mb-4">No saved cars yet</p>
                    <a routerLink="/cars" class="btn-primary">Browse Cars</a>
                  </div>
                } @else {
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    @for (car of favoriteCars; track car.id) {
                      <div class="border rounded-lg p-4">
                        <img [src]="car.images[0]" class="w-full h-32 object-cover rounded mb-3" />
                        <h3 class="font-bold">{{ car.make }} {{ car.model }}</h3>
                        <p class="text-primary font-bold">\${{ car.price.toLocaleString() }}</p>
                        <div class="flex gap-2 mt-3">
                          <a
                            [routerLink]="['/cars', car.id]"
                            class="btn-primary text-sm flex-1 text-center"
                          >
                            View
                          </a>
                          <button class="btn-danger text-sm">Remove</button>
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>
            }

            @if (activeTab === 'brochures') {
              <div class="card">
                <h2 class="text-2xl font-bold mb-6">Downloaded Brochures</h2>

                @if (!user || !user.downloadedBrochures || user.downloadedBrochures.length === 0) {
                  <div class="text-center py-12">
                    <div class="text-6xl mb-4">📄</div>
                    <p class="text-gray-600">No brochures downloaded yet</p>
                  </div>
                } @else {
                  <div class="space-y-3">
                    @for (brochure of user.downloadedBrochures; track brochure.carId) {
                      <div class="flex justify-between items-center p-3 border rounded">
                        <div>
                          <div class="font-semibold">{{ brochure.carName }}</div>
                          <div class="text-sm text-gray-600">{{ brochure.downloadDate }}</div>
                        </div>
                        <button class="btn-secondary text-sm">Re-download</button>
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </main>
        </div>
      </div>
    </div>
  `,
})
export class UserDashboardComponent implements OnInit {
  user: User | null = null;
  bookings: Booking[] = [];
  favoriteCars: any[] = [];
  activeTab = 'profile';

  constructor(
    private authService: Auth,
    private bookingService: BookingService,
    private favoriteService: Favorite,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();

    if (this.user) {
      this.bookings = this.bookingService.getBookingsByUser(this.user.id);
      this.favoriteCars = this.favoriteService.getFavoriteCars();
    }
  }

  getUserInitials(): string {
    if (!this.user) return '';
    return this.user.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
}
