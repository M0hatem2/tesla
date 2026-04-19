import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Car as CarService } from '../../../core/services/car';
import { Dealer as DealerService } from '../../../core/services/dealer';
import { Review as ReviewService } from '../../../core/services/review';
import { Compare } from '../../../core/services/compare';
import { Favorite } from '../../../core/services/favorite';
import { Toast } from '../../../core/services/toast';
import { Auth } from '../../../core/services/auth';
import { Car } from '../../../models/car.model';
import { Dealer } from '../../../models/dealer.model';
import { Review } from '../../../models/review.model';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { KmFormatPipe } from '../../../shared/pipes/km-format.pipe';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyFormatPipe, KmFormatPipe],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  car: Car | undefined;
  dealer: Dealer | undefined;
  reviews: Review[] = [];
  relatedCars: Car[] = [];
  selectedImage = 0;
  activeTab = 'overview';

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private dealerService: DealerService,
    private reviewService: ReviewService,
    private compareService: Compare,
    private favoriteService: Favorite,
    private toastService: Toast,
    private authService: Auth,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const carId = params['id'];
      this.loadCarDetails(carId);
    });
  }

  loadCarDetails(carId: string): void {
    this.car = this.carService.getCarById(carId);

    if (this.car) {
      this.dealer = this.dealerService.getDealerById(this.car.dealerId);
      this.reviews = this.reviewService.getReviewsByCarId(carId);
      this.relatedCars = this.carService.getRelatedCars(carId);
    }
  }

  selectImage(index: number): void {
    this.selectedImage = index;
  }

  addToCompare(): void {
    if (this.car) {
      const success = this.compareService.add(this.car);
      if (success) {
        this.toastService.success('Added to compare');
      } else {
        this.toastService.warning('Compare list is full');
      }
    }
  }

  toggleFavorite(): void {
    if (this.car) {
      this.favoriteService.toggle(this.car.id);
      this.toastService.success('Updated favorites');
    }
  }

  isFavorite(): boolean {
    return this.car ? this.favoriteService.isFavorite(this.car.id) : false;
  }

  downloadBrochure(): void {
    if (!this.authService.isLoggedIn()) {
      this.toastService.warning('Please login to download brochure');
      return;
    }

    if (this.car) {
      this.carService.downloadBrochure(this.car.id);
      this.authService.addDownloadedBrochure(this.car.id, `${this.car.make} ${this.car.model}`);
      this.toastService.success('Brochure downloaded!');
    }
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
