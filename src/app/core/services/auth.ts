import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, RegisterData } from '../../models/user.model';
import { USERS_DATA } from '../../data/users.data';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly STORAGE_KEY = 'carhub_users';
  private readonly CURRENT_USER_KEY = 'carhub_current_user';
  private isBrowser: boolean;

  private currentUserSubject: BehaviorSubject<User | null>;
  currentUser$: Observable<User | null>;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentUserSubject = new BehaviorSubject<User | null>(this.loadCurrentUser());
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.initializeUsers();
  }

  private initializeUsers(): void {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(USERS_DATA));
    }
  }

  private loadCurrentUser(): User | null {
    if (!this.isBrowser) return null;
    const stored = localStorage.getItem(this.CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  private saveCurrentUser(user: User | null): void {
    if (!this.isBrowser) return;
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
    this.currentUserSubject.next(user);
  }

  private getUsers(): User[] {
    if (!this.isBrowser) return USERS_DATA;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveUsers(users: User[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (user && !user.isBanned) {
      this.saveCurrentUser(user);
      return true;
    }
    return false;
  }

  register(data: RegisterData): User {
    const users = this.getUsers();

    const newUser: User = {
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
      city: data.city,
      isBanned: false,
      createdAt: new Date().toISOString(),
      favorites: [],
      downloadedBrochures: [],
    };

    users.push(newUser);
    this.saveUsers(users);
    this.saveCurrentUser(newUser);

    return newUser;
  }

  logout(): void {
    this.saveCurrentUser(null);
  }

  sendResetLink(email: string): void {
    console.log('Password reset link sent to:', email);
  }

  updateProfile(data: Partial<User>): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === currentUser.id);

    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      this.saveUsers(users);
      this.saveCurrentUser(users[index]);
    }
  }

  deleteAccount(): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const users = this.getUsers();
    const filtered = users.filter((u) => u.id !== currentUser.id);
    this.saveUsers(filtered);
    this.logout();
  }

  addToFavorites(carId: string): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    if (!currentUser.favorites.includes(carId)) {
      currentUser.favorites.push(carId);
      this.updateProfile({ favorites: currentUser.favorites });
    }
  }

  removeFromFavorites(carId: string): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    currentUser.favorites = currentUser.favorites.filter((id) => id !== carId);
    this.updateProfile({ favorites: currentUser.favorites });
  }

  addDownloadedBrochure(carId: string, carName: string): void {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const brochure = {
      carId,
      carName,
      downloadDate: new Date().toISOString(),
    };

    currentUser.downloadedBrochures.push(brochure);
    this.updateProfile({ downloadedBrochures: currentUser.downloadedBrochures });
  }

  getUserById(userId: string): User | undefined {
    const users = this.getUsers();
    return users.find((u) => u.id === userId);
  }
}
