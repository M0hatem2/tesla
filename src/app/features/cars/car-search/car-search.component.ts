import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Car as CarService } from '../../../core/services/car';

@Component({
  selector: 'app-car-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl font-bold text-center mb-8">Advanced Car Search</h1>

          <div class="card">
            <div class="mb-6">
              <label class="block text-sm font-semibold mb-2">Search by keyword</label>
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (input)="onSearch()"
                class="input-field"
                placeholder="Search by make, model, or keyword..."
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label class="block text-sm font-semibold mb-2">Make</label>
                <select [(ngModel)]="selectedMake" class="input-field">
                  <option value="">Any Make</option>
                  <option value="Toyota">Toyota</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Honda">Honda</option>
                  <option value="Ford">Ford</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold mb-2">Body Type</label>
                <select [(ngModel)]="selectedBodyType" class="input-field">
                  <option value="">Any Type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="coupe">Coupe</option>
                  <option value="hatchback">Hatchback</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-semibold mb-2">Year</label>
                <select [(ngModel)]="selectedYear" class="input-field">
                  <option value="">Any Year</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>
            </div>

            <button (click)="search()" class="btn-primary w-full">🔍 Search Cars</button>
          </div>

          <div class="mt-8 text-center">
            <a routerLink="/cars" class="text-primary hover:underline"> Or browse all cars → </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CarSearchComponent {
  searchQuery = '';
  selectedMake = '';
  selectedBodyType = '';
  selectedYear = '';

  constructor(
    private carService: CarService,
    private router: Router,
  ) {}

  onSearch(): void {
    // Auto-complete logic here
  }

  search(): void {
    const queryParams: any = {};

    if (this.selectedMake) queryParams.brand = this.selectedMake;
    if (this.selectedBodyType) queryParams.bodyType = this.selectedBodyType;
    if (this.selectedYear) queryParams.year = this.selectedYear;

    this.router.navigate(['/cars'], { queryParams });
  }
}
