import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Dealer as DealerModel } from '../../models/dealer.model';
import { DEALERS_DATA } from '../../data/dealers.data';

@Injectable({
  providedIn: 'root',
})
export class Dealer {
  private readonly STORAGE_KEY = 'carhub_dealers';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.initializeDealers();
  }

  private initializeDealers(): void {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(DEALERS_DATA));
    }
  }

  private getDealers(): DealerModel[] {
    if (!this.isBrowser) return DEALERS_DATA;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveDealers(dealers: DealerModel[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dealers));
  }

  getAllDealers(): DealerModel[] {
    return this.getDealers().filter((d) => d.status !== 'suspended');
  }

  getDealerById(id: string): DealerModel | undefined {
    return this.getDealers().find((d) => d.id === id);
  }

  getDealersByCity(city: string): DealerModel[] {
    return this.getAllDealers().filter((d) => d.city.toLowerCase() === city.toLowerCase());
  }

  getDealersByBrand(brand: string): DealerModel[] {
    return this.getAllDealers().filter((d) =>
      d.brands.some((b) => b.toLowerCase() === brand.toLowerCase()),
    );
  }

  updateDealerProfile(id: string, data: Partial<DealerModel>): void {
    const dealers = this.getDealers();
    const index = dealers.findIndex((d) => d.id === id);

    if (index !== -1) {
      dealers[index] = { ...dealers[index], ...data };
      this.saveDealers(dealers);
    }
  }

  sendMessage(dealerId: string, carId: string, message: string): void {
    console.log('Message sent to dealer:', { dealerId, carId, message });
  }

  approveDealer(id: string): void {
    const dealers = this.getDealers();
    const index = dealers.findIndex((d) => d.id === id);

    if (index !== -1) {
      dealers[index].status = 'verified';
      this.saveDealers(dealers);
    }
  }

  suspendDealer(id: string, reason: string): void {
    const dealers = this.getDealers();
    const index = dealers.findIndex((d) => d.id === id);

    if (index !== -1) {
      dealers[index].status = 'suspended';
      this.saveDealers(dealers);
    }
  }
}
