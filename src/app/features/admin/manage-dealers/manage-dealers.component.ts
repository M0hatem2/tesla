import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dealer } from '../../../core/services/dealer';
import { Car } from '../../../core/services/car';
import { Dealer as DealerModel } from '../../../models/dealer.model';

@Component({
  selector: 'app-manage-dealers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">🏢 Manage Dealers</h1>
          <p class="text-gray-600 mt-2">View and manage all dealerships</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="filterDealers()"
            placeholder="Search by name, city..."
            class="input-field"
          />
          <select [(ngModel)]="filterStatus" (ngModelChange)="filterDealers()" class="input-field">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="text-gray-600 text-sm">Total Dealers</div>
          <div class="text-3xl font-bold text-gray-800 mt-2">{{ allDealers.length }}</div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Verified</div>
          <div class="text-3xl font-bold text-green-600 mt-2">
            {{ allDealers.filter((d) => d.status === 'verified').length }}
          </div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Pending</div>
          <div class="text-3xl font-bold text-yellow-600 mt-2">
            {{ allDealers.filter((d) => d.status === 'pending').length }}
          </div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Total Cars</div>
          <div class="text-3xl font-bold text-purple-600 mt-2">{{ getTotalCars() }}</div>
        </div>
      </div>

      <!-- Dealers Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (dealer of filteredDealers; track dealer.id) {
          <div class="card">
            <!-- Dealer Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <img
                  [src]="dealer.logo"
                  [alt]="dealer.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <div class="font-bold text-gray-800 flex items-center gap-2">
                    {{ dealer.name }}
                    @if (dealer.status === 'verified') {
                      <span class="text-blue-500" title="Verified">✓</span>
                    }
                  </div>
                  <div class="text-sm text-gray-600">{{ dealer.city }}</div>
                </div>
              </div>
              <span
                class="px-2 py-1 rounded-full text-xs font-semibold"
                [ngClass]="{
                  'bg-green-100 text-green-700': dealer.status === 'verified',
                  'bg-yellow-100 text-yellow-700': dealer.status === 'pending',
                  'bg-red-100 text-red-700': dealer.status === 'suspended',
                }"
              >
                {{ dealer.status }}
              </span>
            </div>

            <!-- Dealer Info -->
            <div class="space-y-2 mb-4 text-sm">
              <div class="flex items-center gap-2 text-gray-600">
                <span>📧</span>
                <span>{{ dealer.email }}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <span>📞</span>
                <span>{{ dealer.phone }}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <span>🚗</span>
                <span>{{ getDealerCarCount(dealer.id) }} cars listed</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <span>⭐</span>
                <span>{{ dealer.rating }} ({{ dealer.reviewCount }} reviews)</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 pt-4 border-t border-gray-200">
              @if (dealer.status === 'pending') {
                <button
                  (click)="verifyDealer(dealer.id)"
                  class="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-semibold"
                >
                  Verify
                </button>
              }
              @if (dealer.status === 'verified') {
                <button
                  (click)="suspendDealer(dealer.id)"
                  class="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-semibold"
                >
                  Suspend
                </button>
              }
              @if (dealer.status === 'suspended') {
                <button
                  (click)="activateDealer(dealer.id)"
                  class="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-semibold"
                >
                  Activate
                </button>
              }
            </div>
          </div>
        } @empty {
          <div class="col-span-full text-center py-12 text-gray-500">
            <div class="text-6xl mb-4">🏢</div>
            <p>No dealers found</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class ManageDealersComponent implements OnInit {
  allDealers: DealerModel[] = [];
  filteredDealers: DealerModel[] = [];

  searchQuery = '';
  filterStatus = '';

  constructor(
    private dealerService: Dealer,
    private carService: Car,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.allDealers = this.dealerService.getAllDealers();
    this.filterDealers();
  }

  filterDealers(): void {
    this.filteredDealers = this.allDealers.filter((dealer) => {
      const matchesSearch =
        !this.searchQuery ||
        dealer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        dealer.city.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = !this.filterStatus || dealer.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  getDealerCarCount(dealerId: string): number {
    return this.carService.getCarsByDealer(dealerId).length;
  }

  getTotalCars(): number {
    return this.allDealers.reduce((sum, dealer) => sum + this.getDealerCarCount(dealer.id), 0);
  }

  verifyDealer(dealerId: string): void {
    console.log('Verify dealer:', dealerId);
  }

  suspendDealer(dealerId: string): void {
    if (confirm('Are you sure you want to suspend this dealer?')) {
      console.log('Suspend dealer:', dealerId);
    }
  }

  activateDealer(dealerId: string): void {
    console.log('Activate dealer:', dealerId);
  }
}
