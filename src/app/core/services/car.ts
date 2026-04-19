import { Injectable, PLATFORM_ID, inject, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Car as CarModel, CarFilters } from '../../models/car.model';
import { CARS_DATA } from '../../data/cars.data';

@Injectable({
  providedIn: 'root',
})
export class Car {
  private readonly STORAGE_KEY = 'carhub_cars';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeCars();
  }

  private initializeCars(): void {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(CARS_DATA));
    }
  }

  private getCars(): CarModel[] {
    if (!this.isBrowser) return CARS_DATA;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveCars(cars: CarModel[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cars));
  }

  getAllCars(): CarModel[] {
    return this.getCars().filter((car) => car.status === 'active');
  }

  getCarById(id: string): CarModel | undefined {
    return this.getCars().find((car) => car.id === id);
  }

  getCarsByBrand(brand: string): CarModel[] {
    return this.getAllCars().filter((car) => car.make.toLowerCase() === brand.toLowerCase());
  }

  getCarsByDealer(dealerId: string): CarModel[] {
    return this.getAllCars().filter((car) => car.dealerId === dealerId);
  }

  searchCars(query: string, filters?: CarFilters): CarModel[] {
    let cars = this.getAllCars();

    if (query) {
      const lowerQuery = query.toLowerCase();
      cars = cars.filter(
        (car) =>
          car.make.toLowerCase().includes(lowerQuery) ||
          car.model.toLowerCase().includes(lowerQuery) ||
          car.description.toLowerCase().includes(lowerQuery),
      );
    }

    if (filters) {
      if (filters.make && filters.make.length > 0) {
        cars = cars.filter((car) => filters.make!.includes(car.make));
      }

      if (filters.bodyType && filters.bodyType.length > 0) {
        cars = cars.filter((car) => filters.bodyType!.includes(car.bodyType));
      }

      if (filters.yearMin) {
        cars = cars.filter((car) => car.year >= filters.yearMin!);
      }

      if (filters.yearMax) {
        cars = cars.filter((car) => car.year <= filters.yearMax!);
      }

      if (filters.priceMin) {
        cars = cars.filter((car) => car.price >= filters.priceMin!);
      }

      if (filters.priceMax) {
        cars = cars.filter((car) => car.price <= filters.priceMax!);
      }

      if (filters.fuelType && filters.fuelType.length > 0) {
        cars = cars.filter((car) => filters.fuelType!.includes(car.fuelType));
      }

      if (filters.transmission) {
        cars = cars.filter((car) => car.transmission === filters.transmission);
      }

      if (filters.condition) {
        cars = cars.filter((car) => car.condition === filters.condition);
      }
    }

    return cars;
  }

  getFeaturedCars(): CarModel[] {
    return this.getAllCars().filter((car) => car.isFeatured);
  }

  getRelatedCars(carId: string): CarModel[] {
    const car = this.getCarById(carId);
    if (!car) return [];

    return this.getAllCars()
      .filter((c) => c.id !== carId && (c.make === car.make || c.bodyType === car.bodyType))
      .slice(0, 4);
  }

  autocomplete(query: string): string[] {
    if (!query) return [];

    const lowerQuery = query.toLowerCase();
    const cars = this.getAllCars();
    const results = new Set<string>();

    cars.forEach((car) => {
      const fullName = `${car.make} ${car.model} ${car.year}`;
      if (fullName.toLowerCase().includes(lowerQuery)) {
        results.add(fullName);
      }
    });

    return Array.from(results).slice(0, 5);
  }

  downloadBrochure(carId: string): void {
    console.log('Downloading brochure for car:', carId);
  }

  markSold(carId: string): void {
    const cars = this.getCars();
    const index = cars.findIndex((c) => c.id === carId);

    if (index !== -1) {
      cars[index].status = 'sold';
      this.saveCars(cars);
    }
  }

  deleteCar(carId: string): void {
    const cars = this.getCars();
    const filtered = cars.filter((c) => c.id !== carId);
    this.saveCars(filtered);
  }

  publishCar(data: any): CarModel {
    const cars = this.getCars();

    const newCar: CarModel = {
      ...data,
      id: Date.now().toString(),
      status: 'active',
      createdAt: new Date().toISOString(),
      rating: 0,
      reviewCount: 0,
      isFeatured: false,
    };

    cars.push(newCar);
    this.saveCars(cars);

    return newCar;
  }

  saveDraft(data: any): void {
    const cars = this.getCars();

    const draft: CarModel = {
      ...data,
      id: Date.now().toString(),
      status: 'draft',
      createdAt: new Date().toISOString(),
      rating: 0,
      reviewCount: 0,
      isFeatured: false,
    };

    cars.push(draft);
    this.saveCars(cars);
  }

  updateCar(carId: string, data: Partial<CarModel>): void {
    const cars = this.getCars();
    const index = cars.findIndex((c) => c.id === carId);

    if (index !== -1) {
      cars[index] = { ...cars[index], ...data };
      this.saveCars(cars);
    }
  }
}
