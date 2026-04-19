import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from '../../../core/services/review';
import { Car } from '../../../core/services/car';
import { Auth } from '../../../core/services/auth';
import { Review as ReviewModel } from '../../../models/review.model';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-manage-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeAgoPipe],
  template: `
    <div class="p-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">⭐ Manage Reviews</h1>
          <p class="text-gray-600 mt-2">Moderate and manage customer reviews</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="filterReviews()"
            placeholder="Search reviews..."
            class="input-field"
          />
          <select [(ngModel)]="filterStatus" (ngModelChange)="filterReviews()" class="input-field">
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <select [(ngModel)]="filterRating" (ngModelChange)="filterReviews()" class="input-field">
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div class="card">
          <div class="text-gray-600 text-sm">Total Reviews</div>
          <div class="text-3xl font-bold text-gray-800 mt-2">{{ allReviews.length }}</div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Pending</div>
          <div class="text-3xl font-bold text-yellow-600 mt-2">
            {{ allReviews.filter((r) => !r.isApproved).length }}
          </div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Approved</div>
          <div class="text-3xl font-bold text-green-600 mt-2">
            {{ allReviews.filter((r) => r.isApproved).length }}
          </div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">Avg Rating</div>
          <div class="text-3xl font-bold text-blue-600 mt-2">{{ getAverageRating() }}</div>
        </div>
        <div class="card">
          <div class="text-gray-600 text-sm">5 Stars</div>
          <div class="text-3xl font-bold text-purple-600 mt-2">
            {{ allReviews.filter((r) => r.rating === 5).length }}
          </div>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="space-y-4">
        @for (review of filteredReviews; track review.id) {
          <div class="card">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <div class="font-bold text-gray-800">{{ getUserName(review.userId) }}</div>
                  <div class="flex items-center gap-1">
                    @for (star of [1, 2, 3, 4, 5]; track star) {
                      <span [class]="star <= review.rating ? 'text-yellow-500' : 'text-gray-300'">
                        ⭐
                      </span>
                    }
                  </div>
                  <span class="text-sm text-gray-500">{{ review.createdAt | timeAgo }}</span>
                </div>
                <div class="text-sm text-gray-600 mb-2">
                  Car: <span class="font-semibold">{{ getCarName(review.carId) }}</span>
                </div>
              </div>
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                [ngClass]="{
                  'bg-green-100 text-green-700': review.isApproved,
                  'bg-yellow-100 text-yellow-700': !review.isApproved,
                }"
              >
                {{ review.isApproved ? 'Approved' : 'Pending' }}
              </span>
            </div>

            <!-- Review Content -->
            <div class="mb-4">
              <p class="text-gray-700">{{ review.text }}</p>
            </div>

            <!-- Ratings Breakdown -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm">
              <div>
                <span class="text-gray-600">Exterior:</span>
                <span class="font-semibold ml-1">{{ review.exterior }}/5</span>
              </div>
              <div>
                <span class="text-gray-600">Interior:</span>
                <span class="font-semibold ml-1">{{ review.interior }}/5</span>
              </div>
              <div>
                <span class="text-gray-600">Performance:</span>
                <span class="font-semibold ml-1">{{ review.performance }}/5</span>
              </div>
              <div>
                <span class="text-gray-600">Value:</span>
                <span class="font-semibold ml-1">{{ review.valueForMoney }}/5</span>
              </div>
              <div>
                <span class="text-gray-600">Service:</span>
                <span class="font-semibold ml-1">{{ review.dealerService }}/5</span>
              </div>
              <div>
                <span class="text-gray-600">Recommended:</span>
                <span class="font-semibold ml-1">{{ review.recommended ? 'Yes' : 'No' }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 pt-4 border-t border-gray-200">
              @if (!review.isApproved) {
                <button
                  (click)="approveReview(review.id)"
                  class="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-semibold"
                >
                  ✓ Approve
                </button>
              }
              <button
                (click)="deleteReview(review.id)"
                class="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-semibold"
              >
                Delete
              </button>
              @if (review.isApproved) {
                <button
                  (click)="unapproveReview(review.id)"
                  class="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm font-semibold"
                >
                  Unapprove
                </button>
              }
            </div>
          </div>
        } @empty {
          <div class="card text-center py-12 text-gray-500">
            <div class="text-6xl mb-4">⭐</div>
            <p>No reviews found</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class ManageReviewsComponent implements OnInit {
  allReviews: ReviewModel[] = [];
  filteredReviews: ReviewModel[] = [];

  searchQuery = '';
  filterStatus = '';
  filterRating = '';

  constructor(
    private reviewService: Review,
    private carService: Car,
    private authService: Auth,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.allReviews = this.reviewService.getAllReviews();
    this.filterReviews();
  }

  filterReviews(): void {
    this.filteredReviews = this.allReviews.filter((review) => {
      const matchesSearch =
        !this.searchQuery ||
        review.text.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        review.userName.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus =
        !this.filterStatus ||
        (this.filterStatus === 'approved' && review.isApproved) ||
        (this.filterStatus === 'pending' && !review.isApproved);

      const matchesRating = !this.filterRating || review.rating === parseInt(this.filterRating);

      return matchesSearch && matchesStatus && matchesRating;
    });
  }

  getCarName(carId: string): string {
    const car = this.carService.getCarById(carId);
    return car ? `${car.year} ${car.make} ${car.model}` : 'Unknown Car';
  }

  getUserName(userId: string): string {
    const user = this.authService.getUserById(userId);
    return user ? user.fullName : 'Unknown User';
  }

  getAverageRating(): string {
    if (this.allReviews.length === 0) return '0.0';
    const sum = this.allReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / this.allReviews.length).toFixed(1);
  }

  approveReview(reviewId: string): void {
    this.reviewService.approveReview(reviewId);
    this.loadData();
  }

  unapproveReview(reviewId: string): void {
    this.reviewService.unapproveReview(reviewId);
    this.loadData();
  }

  deleteReview(reviewId: string): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(reviewId);
      this.loadData();
    }
  }
}
