import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class Compare {
  private readonly MAX_COMPARE = 3;
  private compareListSubject = new BehaviorSubject<Car[]>([]);
  compareList$ = this.compareListSubject.asObservable();

  add(car: Car): boolean {
    const currentList = this.compareListSubject.value;

    if (currentList.length >= this.MAX_COMPARE) {
      return false;
    }

    if (currentList.find((c) => c.id === car.id)) {
      return false;
    }

    this.compareListSubject.next([...currentList, car]);
    return true;
  }

  remove(carId: string): void {
    const currentList = this.compareListSubject.value;
    this.compareListSubject.next(currentList.filter((c) => c.id !== carId));
  }

  clearAll(): void {
    this.compareListSubject.next([]);
  }

  isInCompare(carId: string): boolean {
    return this.compareListSubject.value.some((c) => c.id === carId);
  }

  getCount(): number {
    return this.compareListSubject.value.length;
  }
}
