import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Car as CarService } from '../../core/services/car';
import { Car } from '../../models/car.model';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { KmFormatPipe } from '../../shared/pipes/km-format.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyFormatPipe, KmFormatPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredCars: Car[] = [];
  brands = [
    { name: 'Toyota', logo: '🚗' },
    { name: 'BMW', logo: '🏎️' },
    { name: 'Mercedes', logo: '🚙' },
    { name: 'Honda', logo: '🚗' },
    { name: 'Ford', logo: '🚙' },
    { name: 'Tesla', logo: '⚡' },
  ];

  stats = [
    { value: '10,000+', label: 'Cars Listed' },
    { value: '500+', label: 'Verified Dealers' },
    { value: '50,000+', label: 'Happy Customers' },
    { value: '4.9★', label: 'Average Rating' },
  ];

  features = [
    {
      icon: '✅',
      title: 'Verified Dealers',
      description: 'All dealers are verified and trusted',
    },
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Advanced filters to find your ideal car',
    },
    {
      icon: '🚗',
      title: 'Test Drive',
      description: 'Book test drives in just a few clicks',
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Compare prices across hundreds of dealers',
    },
  ];

  testimonials = [
    {
      name: 'Ahmed Hassan',
      avatar: 'https://ui-avatars.com/api/?name=Ahmed+Hassan',
      rating: 5,
      text: 'Amazing platform! Found my dream car in just 2 days. The test drive booking was super easy.',
    },
    {
      name: 'Sara Mohamed',
      avatar: 'https://ui-avatars.com/api/?name=Sara+Mohamed',
      rating: 5,
      text: 'Great experience! The dealers are professional and the prices are competitive.',
    },
    {
      name: 'Omar Ali',
      avatar: 'https://ui-avatars.com/api/?name=Omar+Ali',
      rating: 5,
      text: 'Highly recommend CarHub. The comparison tool helped me make the right decision.',
    },
  ];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.featuredCars = this.carService.getFeaturedCars().slice(0, 6);
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
