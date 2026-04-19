import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Car as CarService } from '../../../core/services/car';
import { Compare } from '../../../core/services/compare';
import { Favorite } from '../../../core/services/favorite';
import { Toast } from '../../../core/services/toast';
import { Car, CarFilters } from '../../../models/car.model';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { KmFormatPipe } from '../../../shared/pipes/km-format.pipe';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CurrencyFormatPipe, KmFormatPipe],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  allCars: Car[] = [];
  filteredCars: Car[] = [];
  displayedCars: Car[] = [];

  filters: CarFilters = {
    make: [],
    bodyType: [],
    yearMin: 2015,
    yearMax: 2024,
    priceMin: 5000,
    priceMax: 150000,
    fuelType: [],
    transmission: undefined,
    condition: undefined,
  };

  makes = [
    'Toyota',
    'BMW',
    'Mercedes',
    'Honda',
    'Ford',
    'Hyundai',
    'Kia',
    'Tesla',
    'Audi',
    'Nissan',
  ];
  bodyTypes = ['sedan', 'suv', 'coupe', 'hatchback', 'pickup', 'van'];
  fuelTypes = ['petrol', 'diesel', 'electric', 'hybrid'];

  sortBy = 'newest';
  viewMode = 'grid';
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;

  constructor(
    private carService: CarService,
    private compareService: Compare,
    private favoriteService: Favorite,
    private toastService: Toast,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.allCars = this.carService.getAllCars();

    this.route.queryParams.subscribe((params) => {
      if (params['brand']) {
        this.filters.make = [params['brand']];
      }
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredCars = this.carService.searchCars('', this.filters);
    this.sortCars();
    this.updatePagination();
  }

  sortCars(): void {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredCars.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredCars.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        this.filteredCars.sort((a, b) => b.year - a.year);
        break;
      case 'rating':
        this.filteredCars.sort((a, b) => b.rating - a.rating);
        break;
    }
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCars.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedCars = this.filteredCars.slice(start, end);
  }

  toggleMake(make: string): void {
    const index = this.filters.make!.indexOf(make);
    if (index > -1) {
      this.filters.make!.splice(index, 1);
    } else {
      this.filters.make!.push(make);
    }
    this.applyFilters();
  }

  toggleBodyType(type: string): void {
    const index = this.filters.bodyType!.indexOf(type);
    if (index > -1) {
      this.filters.bodyType!.splice(index, 1);
    } else {
      this.filters.bodyType!.push(type);
    }
    this.applyFilters();
  }

  toggleFuelType(type: string): void {
    const index = this.filters.fuelType!.indexOf(type);
    if (index > -1) {
      this.filters.fuelType!.splice(index, 1);
    } else {
      this.filters.fuelType!.push(type);
    }
    this.applyFilters();
  }

  resetFilters(): void {
    this.filters = {
      make: [],
      bodyType: [],
      yearMin: 2015,
      yearMax: 2024,
      priceMin: 5000,
      priceMax: 150000,
      fuelType: [],
      transmission: undefined,
      condition: undefined,
    };
    this.applyFilters();
  }

  addToCompare(car: Car): void {
    const success = this.compareService.add(car);
    if (success) {
      this.toastService.success('Added to compare');
    } else {
      this.toastService.warning('Compare list is full (max 3 cars)');
    }
  }

  toggleFavorite(carId: string): void {
    this.favoriteService.toggle(carId);
    this.toastService.success('Updated favorites');
  }

  isFavorite(carId: string): boolean {
    return this.favoriteService.isFavorite(carId);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
