import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Dealer as DealerService } from '../../../core/services/dealer';
import { Dealer } from '../../../models/dealer.model';

@Component({
  selector: 'app-dealerships-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-center mb-4">Car Dealerships</h1>
        <p class="text-center text-gray-600 mb-8">Find verified dealers near you</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (dealer of dealers; track dealer.id) {
            <div class="card hover:shadow-xl transition-all">
              <div class="flex items-center gap-4 mb-4">
                <img [src]="dealer.logo" [alt]="dealer.name" class="w-16 h-16 rounded-full" />
                <div>
                  <h3 class="text-xl font-bold">{{ dealer.name }}</h3>
                  <div class="flex text-yellow-500">
                    @for (star of getStarArray(dealer.rating); track $index) {
                      <span>★</span>
                    }
                    <span class="text-gray-600 ml-2">({{ dealer.reviewCount }})</span>
                  </div>
                </div>
              </div>

              <div class="space-y-2 text-sm text-gray-600 mb-4">
                <div class="flex items-center gap-2">
                  <span>📍</span>
                  <span>{{ dealer.city }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span>📞</span>
                  <span>{{ dealer.phone }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span>🚗</span>
                  <span>{{ dealer.totalCars }} cars available</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4">
                @for (brand of dealer.brands; track brand) {
                  <span class="badge-primary text-xs">{{ brand }}</span>
                }
              </div>

              <p class="text-gray-700 mb-4 line-clamp-2">{{ dealer.description }}</p>

              <a [routerLink]="['/dealerships', dealer.id]" class="btn-primary w-full text-center">
                View Dealership
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class DealershipsListComponent implements OnInit {
  dealers: Dealer[] = [];

  constructor(private dealerService: DealerService) {}

  ngOnInit(): void {
    this.dealers = this.dealerService.getAllDealers();
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
