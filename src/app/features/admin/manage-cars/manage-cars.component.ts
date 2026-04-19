import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../../../core/services/car';
import { Dealer } from '../../../core/services/dealer';
import { Car as CarModel } from '../../../models/car.model';
import { Dealer as DealerModel } from '../../../models/dealer.model';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { KmFormatPipe } from '../../../shared/pipes/km-format.pipe';

@Component({
  selector: 'app-manage-cars',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyFormatPipe, KmFormatPipe],
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">🚗 Manage Cars</h1>
          <p class="text-gray-600 mt-2">View and manage all car listings</p>
        </div>
        <button class="btn-primary" (click)="showAddModal = true">+ Add New Car</button>
      </div>

      <!-- Filters -->
      <div class="card mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="filterCars()"
            placeholder="Search by make, model..."
            class="input-field"
          />
          <select [(ngModel)]="filterStatus" (ngModelChange)="filterCars()" class="input-field">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="sold">Sold</option>
            <option value="pending">Pending</option>
          </select>
          <select [(ngModel)]="filterCondition" (ngModelChange)="filterCars()" class="input-field">
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="certified">Certified</option>
          </select>
          <select [(ngModel)]="filterDealer" (ngModelChange)="filterCars()" class="input-field">
            <option value="">All Dealers</option>
            @for (dealer of dealers; track dealer.id) {
              <option [value]="dealer.id">{{ dealer.name }}</option>
            }
          </select>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="text-gray-600 text-sm">Total Cars</div>
          <div class="text-3xl font-bold text-gray-800 mt-2">{{ allCars.length }}</div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Active</div>
          <div class="text-3xl font-bold text-green-600 mt-2">
            {{ allCars.filter((c) => c.status === 'active').length }}
          </div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Sold</div>
          <div class="text-3xl font-bold text-blue-600 mt-2">
            {{ allCars.filter((c) => c.status === 'sold').length }}
          </div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Draft</div>
          <div class="text-3xl font-bold text-yellow-600 mt-2">
            {{ allCars.filter((c) => c.status === 'draft').length }}
          </div>
        </div>
      </div>

      <!-- Cars Table -->
      <div class="card overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Car</th>
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Price</th>
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Condition</th>
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Dealer</th>
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
              <th class="text-left py-4 px-4 font-semibold text-gray-700">Featured</th>
              <th class="text-right py-4 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (car of filteredCars; track car.id) {
              <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-4 px-4">
                  <div class="flex items-center gap-3">
                    <img
                      [src]="car.images[0]"
                      [alt]="car.make + ' ' + car.model"
                      class="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <div class="font-semibold text-gray-800">
                        {{ car.year }} {{ car.make }} {{ car.model }}
                      </div>
                      <div class="text-sm text-gray-600">{{ car.mileage | kmFormat }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4">
                  <div class="font-semibold text-gray-800">{{ car.price | currencyFormat }}</div>
                  @if (car.previousPrice) {
                    <div class="text-sm text-gray-500 line-through">
                      {{ car.previousPrice | currencyFormat }}
                    </div>
                  }
                </td>
                <td class="py-4 px-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                    [ngClass]="{
                      'bg-green-100 text-green-700': car.condition === 'new',
                      'bg-blue-100 text-blue-700': car.condition === 'certified',
                      'bg-gray-100 text-gray-700': car.condition === 'used',
                    }"
                  >
                    {{ car.condition }}
                  </span>
                </td>
                <td class="py-4 px-4 text-gray-700">
                  {{ getDealerName(car.dealerId) }}
                </td>
                <td class="py-4 px-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-semibold"
                    [ngClass]="{
                      'bg-green-100 text-green-700': car.status === 'active',
                      'bg-blue-100 text-blue-700': car.status === 'sold',
                      'bg-yellow-100 text-yellow-700': car.status === 'draft',
                    }"
                  >
                    {{ car.status }}
                  </span>
                </td>
                <td class="py-4 px-4">
                  @if (car.isFeatured) {
                    <span class="text-yellow-500">⭐ Featured</span>
                  } @else {
                    <span class="text-gray-400">-</span>
                  }
                </td>
                <td class="py-4 px-4">
                  <div class="flex justify-end gap-2">
                    <button
                      (click)="editCar(car)"
                      class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      (click)="toggleFeatured(car.id)"
                      class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm"
                    >
                      {{ car.isFeatured ? 'Unfeature' : 'Feature' }}
                    </button>
                    <button
                      (click)="deleteCar(car.id)"
                      class="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="7" class="py-12 text-center text-gray-500">
                  <div class="text-6xl mb-4">🚗</div>
                  <p>No cars found</p>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class ManageCarsComponent implements OnInit {
  allCars: CarModel[] = [];
  filteredCars: CarModel[] = [];
  dealers: DealerModel[] = [];

  searchQuery = '';
  filterStatus = '';
  filterCondition = '';
  filterDealer = '';
  showAddModal = false;

  constructor(
    private carService: Car,
    private dealerService: Dealer,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.allCars = this.carService.getAllCars();
    this.dealers = this.dealerService.getAllDealers();
    this.filterCars();
  }

  filterCars(): void {
    this.filteredCars = this.allCars.filter((car) => {
      const matchesSearch =
        !this.searchQuery ||
        car.make.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = !this.filterStatus || car.status === this.filterStatus;
      const matchesCondition = !this.filterCondition || car.condition === this.filterCondition;
      const matchesDealer = !this.filterDealer || car.dealerId === this.filterDealer;

      return matchesSearch && matchesStatus && matchesCondition && matchesDealer;
    });
  }

  getDealerName(dealerId: string): string {
    const dealer = this.dealers.find((d) => d.id === dealerId);
    return dealer ? dealer.name : 'Unknown';
  }

  editCar(car: CarModel): void {
    // TODO: Implement edit functionality
    console.log('Edit car:', car);
  }

  toggleFeatured(carId: string): void {
    // TODO: Implement toggle featured
    console.log('Toggle featured:', carId);
  }

  deleteCar(carId: string): void {
    if (confirm('Are you sure you want to delete this car?')) {
      // TODO: Implement delete
      console.log('Delete car:', carId);
    }
  }
}
