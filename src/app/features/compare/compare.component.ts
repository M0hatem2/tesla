import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Compare } from '../../core/services/compare';
import { Car } from '../../models/car.model';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { KmFormatPipe } from '../../shared/pipes/km-format.pipe';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyFormatPipe, KmFormatPipe],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-center mb-8">Compare Cars</h1>

        @if (cars.length === 0) {
          <div class="card text-center py-12">
            <div class="text-6xl mb-4">📊</div>
            <h3 class="text-2xl font-bold mb-2">No cars to compare</h3>
            <p class="text-gray-600 mb-4">Add cars from the listings page</p>
            <a routerLink="/cars" class="btn-primary">Browse Cars</a>
          </div>
        } @else {
          <div class="card overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="p-4 text-left">Feature</th>
                  @for (car of cars; track car.id) {
                    <th class="p-4">
                      <img
                        [src]="car.images[0]"
                        class="w-32 h-24 object-cover rounded mb-2 mx-auto"
                      />
                      <div class="font-bold">{{ car.make }} {{ car.model }}</div>
                      <button
                        (click)="remove(car.id)"
                        class="text-red-600 text-sm hover:underline mt-2"
                      >
                        Remove
                      </button>
                    </th>
                  }
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-4 font-semibold">Price</td>
                  @for (car of cars; track car.id) {
                    <td class="p-4 text-center text-xl font-bold text-primary">
                      {{ car.price | currencyFormat }}
                    </td>
                  }
                </tr>
                <tr class="border-b">
                  <td class="p-4 font-semibold">Year</td>
                  @for (car of cars; track car.id) {
                    <td class="p-4 text-center">{{ car.year }}</td>
                  }
                </tr>
                <tr class="border-b">
                  <td class="p-4 font-semibold">Mileage</td>
                  @for (car of cars; track car.id) {
                    <td class="p-4 text-center">{{ car.mileage | kmFormat }}</td>
                  }
                </tr>
                <tr class="border-b">
                  <td class="p-4 font-semibold">Engine</td>
                  @for (car of cars; track car.id) {
                    <td class="p-4 text-center">{{ car.engineSize }}</td>
                  }
                </tr>
                <tr class="border-b">
                  <td class="p-4 font-semibold">Horsepower</td>
                  @for (car of cars; track car.id) {
                    <td class="p-4 text-center">{{ car.horsepower }} HP</td>
                  }
                </tr>
                <tr class="border-b">
                  <td class="p-4 font-semibold">Fuel Type</td>
                  @for (car of cars; track car.id) {
                    <td class="p-4 text-center capitalize">{{ car.fuelType }}</td>
                  }
                </tr>
                <tr class="border-b">
                  <td class="p-4 font-semibold">Transmission</td>
                  @for (car of cars; track car.id) {
                    <td class="p-4 text-center capitalize">{{ car.transmission }}</td>
                  }
                </tr>
                <tr class="border-b">
                  <td class="p-4 font-semibold">Rating</td>
                  @for (car of cars; track car.id) {
                    <td class="p-4 text-center">{{ car.rating }}★</td>
                  }
                </tr>
                <tr>
                  <td class="p-4 font-semibold">Actions</td>
                  @for (car of cars; track car.id) {
                    <td class="p-4 text-center">
                      <a [routerLink]="['/cars', car.id]" class="btn-primary text-sm mb-2 block">
                        View Details
                      </a>
                      <a [routerLink]="['/test-drive', car.id]" class="btn-accent text-sm block">
                        Book Test Drive
                      </a>
                    </td>
                  }
                </tr>
              </tbody>
            </table>
          </div>

          <div class="text-center mt-6">
            <button (click)="clearAll()" class="btn-danger">Clear All & Start Over</button>
          </div>
        }
      </div>
    </div>
  `,
})
export class CompareComponent implements OnInit {
  cars: Car[] = [];

  constructor(private compareService: Compare) {}

  ngOnInit(): void {
    this.compareService.compareList$.subscribe((cars) => {
      this.cars = cars;
    });
  }

  remove(carId: string): void {
    this.compareService.remove(carId);
  }

  clearAll(): void {
    this.compareService.clearAll();
  }
}
