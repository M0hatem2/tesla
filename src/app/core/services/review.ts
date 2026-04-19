import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Review as ReviewModel, ReviewData } from '../../models/review.model';
import { REVIEWS_DATA } from '../../data/reviews.data';

@Injectable({
  providedIn: 'root',
})
export class Review {
  private readonly STORAGE_KEY = 'carhub_reviews';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeReviews();
  }

  private initializeReviews(): void {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(REVIEWS_DATA));
    }
  }

  private getReviews(): ReviewModel[] {
    if (!this.isBrowser) return REVIEWS_DATA;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveReviews(reviews: ReviewModel[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reviews));
  }

  getReviewsByCarId(carId: string): ReviewModel[] {
    return this.getReviews().filter((r) => r.carId === carId && r.isApproved);
  }

  getReviewsByUserId(userId: string): ReviewModel[] {
    return this.getReviews().filter((r) => r.userId === userId);
  }

  submitReview(data: ReviewData, userId: string, userName: string): ReviewModel {
    const reviews = this.getReviews();

    const newReview: ReviewModel = {
      ...data,
      id: Date.now().toString(),
      userId,
      userName,
      helpfulCount: 0,
      isFlagged: false,
      isApproved: true,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    this.saveReviews(reviews);

    return newReview;
  }

  updateReview(id: string, data: Partial<ReviewModel>): void {
    const reviews = this.getReviews();
    const index = reviews.findIndex((r) => r.id === id);

    if (index !== -1) {
      reviews[index] = { ...reviews[index], ...data };
      this.saveReviews(reviews);
    }
  }

  deleteReview(id: string): void {
    const reviews = this.getReviews();
    const filtered = reviews.filter((r) => r.id !== id);
    this.saveReviews(filtered);
  }

  markHelpful(reviewId: string): void {
    const reviews = this.getReviews();
    const index = reviews.findIndex((r) => r.id === reviewId);

    if (index !== -1) {
      reviews[index].helpfulCount++;
      this.saveReviews(reviews);
    }
  }

  replyToReview(reviewId: string, reply: string): void {
    const reviews = this.getReviews();
    const index = reviews.findIndex((r) => r.id === reviewId);

    if (index !== -1) {
      reviews[index].reply = reply;
      this.saveReviews(reviews);
    }
  }

  flagReview(reviewId: string, reason: string): void {
    const reviews = this.getReviews();
    const index = reviews.findIndex((r) => r.id === reviewId);

    if (index !== -1) {
      reviews[index].isFlagged = true;
      this.saveReviews(reviews);
    }
  }

  approveReview(id: string): void {
    const reviews = this.getReviews();
    const index = reviews.findIndex((r) => r.id === id);

    if (index !== -1) {
      reviews[index].isApproved = true;
      reviews[index].isFlagged = false;
      this.saveReviews(reviews);
    }
  }

  getAverageRating(carId: string): number {
    const reviews = this.getReviewsByCarId(carId);
    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }

  getAllReviews(): ReviewModel[] {
    return this.getReviews();
  }

  unapproveReview(reviewId: string): void {
    const reviews = this.getReviews();
    const index = reviews.findIndex((r) => r.id === reviewId);

    if (index !== -1) {
      reviews[index].isApproved = false;
      this.saveReviews(reviews);
    }
  }
}
