export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  previousPrice?: number;
  mileage: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'automatic' | 'manual';
  bodyType: 'sedan' | 'suv' | 'coupe' | 'hatchback' | 'pickup' | 'van';
  color: string;
  seats: number;
  doors: number;
  engineSize: string;
  horsepower: number;
  condition: 'new' | 'used' | 'certified';
  features: string[];
  images: string[];
  dealerId: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  status: 'active' | 'sold' | 'draft';
  vin: string;
  description: string;
  createdAt: string;
  fuelEconomy: string;
  safetyRating: number;
}

export interface CarFilters {
  make?: string[];
  bodyType?: string[];
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileage?: string;
  fuelType?: string[];
  transmission?: string;
  color?: string[];
  condition?: string;
  seats?: number[];
}
