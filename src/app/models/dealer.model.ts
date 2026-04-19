export interface Dealer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  logo: string;
  brands: string[];
  rating: number;
  reviewCount: number;
  status: 'pending' | 'verified' | 'suspended';
  workingHours: WorkingHours;
  description: string;
  totalCars: number;
}

export interface WorkingHours {
  [day: string]: string;
}
