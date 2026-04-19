import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-900 text-white">
        <div class="p-6">
          <h2 class="text-2xl font-bold">🛡️ Admin Panel</h2>
        </div>

        <nav class="px-4">
          <a
            routerLink="/admin/dashboard"
            routerLinkActive="bg-primary"
            class="block px-4 py-3 rounded mb-2 hover:bg-gray-800"
          >
            📊 Dashboard
          </a>
          <a
            routerLink="/admin/users"
            routerLinkActive="bg-primary"
            class="block px-4 py-3 rounded mb-2 hover:bg-gray-800"
          >
            👥 Manage Users
          </a>
          <a
            routerLink="/admin/cars"
            routerLinkActive="bg-primary"
            class="block px-4 py-3 rounded mb-2 hover:bg-gray-800"
          >
            🚗 Manage Cars
          </a>
          <a
            routerLink="/admin/bookings"
            routerLinkActive="bg-primary"
            class="block px-4 py-3 rounded mb-2 hover:bg-gray-800"
          >
            📅 Manage Bookings
          </a>
          <a
            routerLink="/admin/dealers"
            routerLinkActive="bg-primary"
            class="block px-4 py-3 rounded mb-2 hover:bg-gray-800"
          >
            🏢 Manage Dealers
          </a>
          <a
            routerLink="/admin/reviews"
            routerLinkActive="bg-primary"
            class="block px-4 py-3 rounded mb-2 hover:bg-gray-800"
          >
            ⭐ Manage Reviews
          </a>
          <a
            routerLink="/admin/blog"
            routerLinkActive="bg-primary"
            class="block px-4 py-3 rounded mb-2 hover:bg-gray-800"
          >
            📝 Manage Blog
          </a>

          <div class="border-t border-gray-700 my-4"></div>

          <a routerLink="/" class="block px-4 py-3 rounded mb-2 hover:bg-gray-800">
            🏠 Back to Site
          </a>
          <button (click)="logout()" class="w-full text-left px-4 py-3 rounded hover:bg-gray-800">
            🚪 Logout
          </button>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AdminLayoutComponent {
  constructor(
    private authService: Auth,
    private router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
