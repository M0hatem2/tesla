import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth } from './auth';
import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class Favorite {
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(
    private authService: Auth,
    private carService: Car,
  ) {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.favoritesSubject.next(user.favorites || []);
    }
  }

  toggle(carId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const favorites = this.favoritesSubject.value;

    if (favorites.includes(carId)) {
      this.authService.removeFromFavorites(carId);
      this.favoritesSubject.next(favorites.filter((id) => id !== carId));
    } else {
      this.authService.addToFavorites(carId);
      this.favoritesSubject.next([...favorites, carId]);
    }
  }

  isFavorite(carId: string): boolean {
    return this.favoritesSubject.value.includes(carId);
  }

  getFavoriteCars() {
    const favoriteIds = this.favoritesSubject.value;
    return favoriteIds
      .map((id) => this.carService.getCarById(id))
      .filter((car) => car !== undefined);
  }

  remove(carId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.authService.removeFromFavorites(carId);
    const favorites = this.favoritesSubject.value;
    this.favoritesSubject.next(favorites.filter((id) => id !== carId));
  }
}
