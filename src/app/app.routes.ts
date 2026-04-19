import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { dealerGuard } from './core/guards/dealer-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'cars',
    loadComponent: () =>
      import('./features/cars/car-list/car-list.component').then((m) => m.CarListComponent),
  },
  {
    path: 'cars/:id',
    loadComponent: () =>
      import('./features/cars/car-details/car-details.component').then(
        (m) => m.CarDetailsComponent,
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/cars/car-search/car-search.component').then((m) => m.CarSearchComponent),
  },
  {
    path: 'compare',
    loadComponent: () =>
      import('./features/compare/compare.component').then((m) => m.CompareComponent),
  },
  {
    path: 'dealerships',
    loadComponent: () =>
      import('./features/dealerships/dealerships-list/dealerships-list.component').then(
        (m) => m.DealershipsListComponent,
      ),
  },
  {
    path: 'loan-calculator',
    loadComponent: () =>
      import('./features/loan-calculator/loan-calculator.component').then(
        (m) => m.LoanCalculatorComponent,
      ),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog-list/blog-list.component').then((m) => m.BlogListComponent),
  },
  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./features/blog/blog-details/blog-details.component').then(
        (m) => m.BlogDetailsComponent,
      ),
  },
  {
    path: 'faq',
    loadComponent: () => import('./features/faq/faq.component').then((m) => m.FaqComponent),
  },
  {
    path: 'insurance',
    loadComponent: () =>
      import('./features/insurance/insurance.component').then((m) => m.InsuranceComponent),
  },
  {
    path: 'maintenance',
    loadComponent: () =>
      import('./features/maintenance/maintenance.component').then((m) => m.MaintenanceComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user-dashboard/user-dashboard.component').then(
        (m) => m.UserDashboardComponent,
      ),
  },
  {
    path: 'test-drive/:carId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/booking/booking-form/booking-form.component').then(
        (m) => m.BookingFormComponent,
      ),
  },
  {
    path: 'dealer',
    canActivate: [authGuard, dealerGuard],
    loadComponent: () =>
      import('./features/dealer-dashboard/dealer-dashboard.component').then(
        (m) => m.DealerDashboardComponent,
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/admin/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/manage-users/manage-users.component').then(
            (m) => m.ManageUsersComponent,
          ),
      },
      {
        path: 'cars',
        loadComponent: () =>
          import('./features/admin/manage-cars/manage-cars.component').then(
            (m) => m.ManageCarsComponent,
          ),
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./features/admin/manage-bookings/manage-bookings.component').then(
            (m) => m.ManageBookingsComponent,
          ),
      },
      {
        path: 'dealers',
        loadComponent: () =>
          import('./features/admin/manage-dealers/manage-dealers.component').then(
            (m) => m.ManageDealersComponent,
          ),
      },
      {
        path: 'reviews',
        loadComponent: () =>
          import('./features/admin/manage-reviews/manage-reviews.component').then(
            (m) => m.ManageReviewsComponent,
          ),
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./features/admin/manage-blog/manage-blog.component').then(
            (m) => m.ManageBlogComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
