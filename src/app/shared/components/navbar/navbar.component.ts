import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { Compare } from '../../../core/services/compare';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  compareCount = 0;
  isMenuOpen = false;
  isUserMenuOpen = false;

  constructor(
    private authService: Auth,
    private compareService: Compare,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    this.compareService.compareList$.subscribe((list) => {
      this.compareCount = list.length;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isUserMenuOpen = false;
    this.router.navigate(['/']);
  }

  getUserInitials(): string {
    if (!this.currentUser) return '';
    return this.currentUser.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
}
