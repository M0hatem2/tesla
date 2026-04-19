# 🚗 CarHub — Car Listing & Test Drive Booking Platform

> **Full Angular Frontend Project — Fake Data (No Backend)**
> Light Mode | Modern SaaS Design | Angular 17+ Standalone Components

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Theme & Design System](#theme--design-system)
4. [Folder Structure](#folder-structure)
5. [Routing Structure](#routing-structure)
6. [Pages & Components (Detailed)](#pages--components-detailed)
   - [Home Page](#1-home-page)
   - [User Auth (Register / Login)](#2-user-auth-register--login)
   - [Car Listings](#3-car-listings-page)
   - [Car Details](#4-car-details-page)
   - [Car Search & Filters](#5-car-search--filters)
   - [Compare Cars](#6-compare-cars-page)
   - [Download Brochures](#7-download-brochures)
   - [Test Drive Booking](#8-test-drive-booking)
   - [View Car Dealerships](#9-view-car-dealerships)
   - [Car Loan Calculator](#10-car-loan-calculator)
   - [Car Price Updates](#11-car-price-updates)
   - [Contact Dealerships](#12-contact-dealerships)
   - [User Dashboard](#13-user-dashboard)
   - [Dealer Dashboard](#14-dealer-dashboard)
   - [Review & Rating System](#15-review--rating-system)
   - [Car Insurance Information](#16-car-insurance-information)
   - [Car Maintenance Guide](#17-car-maintenance-guide)
   - [Upcoming Car Models](#18-upcoming-car-models)
   - [Blog & Articles](#19-blog--articles)
   - [FAQ Section](#20-faq-section)
   - [Admin Panel](#21-admin-panel)
7. [Services](#services)
8. [Models / Interfaces](#models--interfaces)
9. [Fake Data (Mock Data)](#fake-data-mock-data)
10. [Guards](#guards)
11. [Shared Components](#shared-components)
12. [Pipes](#pipes)
13. [Directives](#directives)
14. [Animations](#animations)
15. [Angular Project Setup Commands](#angular-project-setup-commands)

---

## Project Overview

**CarHub** is a full-featured car listing and test drive booking web application built with Angular. The platform connects car buyers with dealerships, providing a seamless experience for browsing vehicles, booking test drives, comparing cars, calculating loans, and managing everything through role-based dashboards.

**Roles:**
- **Guest** — Can browse listings, search, view details, read blog.
- **User (Buyer)** — Can register/login, book test drives, save favorites, write reviews, download brochures, contact dealers.
- **Dealer** — Can manage their car listings, view bookings, respond to reviews.
- **Admin** — Full control over all users, listings, bookings, and content.

**Data Strategy:** All data is fake/mocked using `fake-data` services that return static arrays and objects. No HTTP calls to real APIs. Data is persisted via `localStorage` for session simulation.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 17+ | Core framework (Standalone Components) |
| TypeScript | 5.x | Language |
| Tailwind CSS | 3.x | Styling utility framework |
| Font Awesome | 6.x | Icons |
| Angular Router | Built-in | Navigation |
| Angular Forms | Built-in | Reactive Forms + Template Forms |
| Angular Animations | Built-in | Page/component transitions |
| localStorage | Browser API | Fake data persistence |
| RxJS | 7.x | Reactive programming, BehaviorSubjects |

---

## Theme & Design System

### Color Palette

```
Primary Blue:       #1D4ED8   (main CTAs, links, active states)
Primary Blue Light: #3B82F6   (hover states)
Primary Blue Dark:  #1E3A8A   (pressed states, dark text)
Accent Orange:      #F97316   (highlights, badges, promotions)
Accent Orange Light:#FB923C   (hover accent)
Success Green:      #16A34A   (available, confirmed, success messages)
Warning Yellow:     #EAB308   (pending, under review)
Danger Red:         #DC2626   (errors, sold out, cancel buttons)
White:              #FFFFFF   (backgrounds, cards)
Gray 50:            #F9FAFB   (page backgrounds)
Gray 100:           #F3F4F6   (card backgrounds, inputs)
Gray 200:           #E5E7EB   (borders, dividers)
Gray 400:           #9CA3AF   (placeholder text)
Gray 600:           #4B5563   (secondary text)
Gray 800:           #1F2937   (primary text, headings)
Gray 900:           #111827   (navbar, footer backgrounds)
```

### Typography

```
Font Family:     'Inter', sans-serif  (Google Fonts)
Heading H1:      font-size: 3rem    (48px) — font-weight: 800
Heading H2:      font-size: 2.25rem (36px) — font-weight: 700
Heading H3:      font-size: 1.875rem(30px) — font-weight: 600
Heading H4:      font-size: 1.5rem  (24px) — font-weight: 600
Body Large:      font-size: 1.125rem(18px) — font-weight: 400
Body:            font-size: 1rem    (16px) — font-weight: 400
Small:           font-size: 0.875rem(14px) — font-weight: 400
XSmall:          font-size: 0.75rem (12px) — font-weight: 500
```

### Tailwind Config (`tailwind.config.js`)

```js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D4ED8',
          light: '#3B82F6',
          dark: '#1E3A8A',
        },
        accent: {
          DEFAULT: '#F97316',
          light: '#FB923C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(0,0,0,0.08)',
        'card-hover': '0 8px 32px 0 rgba(0,0,0,0.14)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
```

### Common Component Classes (Tailwind Utility Patterns)

```
.btn-primary    → bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-all
.btn-secondary  → border border-primary text-primary px-6 py-2.5 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all
.btn-accent     → bg-accent text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-accent-light transition-all
.btn-danger     → bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-all
.card           → bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-all
.input-field    → w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary text-gray-800
.badge-success  → bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full
.badge-warning  → bg-yellow-100 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full
.badge-danger   → bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full
.badge-primary  → bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full
.section-title  → text-3xl font-bold text-gray-800 mb-2
.section-sub    → text-gray-500 text-lg mb-10
```

---

## Folder Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   ├── dealer.guard.ts
│   │   │   └── admin.guard.ts
│   │   ├── interceptors/
│   │   │   └── fake-auth.interceptor.ts
│   │   └── services/
│   │       ├── auth.service.ts
│   │       ├── car.service.ts
│   │       ├── booking.service.ts
│   │       ├── dealer.service.ts
│   │       ├── review.service.ts
│   │       ├── blog.service.ts
│   │       ├── insurance.service.ts
│   │       ├── maintenance.service.ts
│   │       ├── loan-calculator.service.ts
│   │       ├── compare.service.ts
│   │       ├── favorite.service.ts
│   │       ├── notification.service.ts
│   │       ├── admin.service.ts
│   │       └── toast.service.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.component.ts
│   │   │   │   └── navbar.component.html
│   │   │   ├── footer/
│   │   │   │   ├── footer.component.ts
│   │   │   │   └── footer.component.html
│   │   │   ├── car-card/
│   │   │   │   ├── car-card.component.ts
│   │   │   │   └── car-card.component.html
│   │   │   ├── star-rating/
│   │   │   │   ├── star-rating.component.ts
│   │   │   │   └── star-rating.component.html
│   │   │   ├── toast/
│   │   │   │   ├── toast.component.ts
│   │   │   │   └── toast.component.html
│   │   │   ├── breadcrumb/
│   │   │   │   ├── breadcrumb.component.ts
│   │   │   │   └── breadcrumb.component.html
│   │   │   ├── confirm-dialog/
│   │   │   │   ├── confirm-dialog.component.ts
│   │   │   │   └── confirm-dialog.component.html
│   │   │   ├── loader/
│   │   │   │   ├── loader.component.ts
│   │   │   │   └── loader.component.html
│   │   │   └── pagination/
│   │   │       ├── pagination.component.ts
│   │   │       └── pagination.component.html
│   │   ├── pipes/
│   │   │   ├── currency-format.pipe.ts
│   │   │   ├── km-format.pipe.ts
│   │   │   └── time-ago.pipe.ts
│   │   └── directives/
│   │       ├── click-outside.directive.ts
│   │       └── lazy-image.directive.ts
│   │
│   ├── features/
│   │   ├── home/
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── sections/
│   │   │       ├── hero/
│   │   │       ├── featured-cars/
│   │   │       ├── why-choose-us/
│   │   │       ├── brands/
│   │   │       ├── testimonials/
│   │   │       └── stats/
│   │   │
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   └── login.component.html
│   │   │   └── register/
│   │   │       ├── register.component.ts
│   │   │       └── register.component.html
│   │   │
│   │   ├── cars/
│   │   │   ├── car-list/
│   │   │   │   ├── car-list.component.ts
│   │   │   │   └── car-list.component.html
│   │   │   ├── car-details/
│   │   │   │   ├── car-details.component.ts
│   │   │   │   └── car-details.component.html
│   │   │   └── car-search/
│   │   │       ├── car-search.component.ts
│   │   │       └── car-search.component.html
│   │   │
│   │   ├── compare/
│   │   │   ├── compare.component.ts
│   │   │   └── compare.component.html
│   │   │
│   │   ├── booking/
│   │   │   ├── booking-form/
│   │   │   │   ├── booking-form.component.ts
│   │   │   │   └── booking-form.component.html
│   │   │   └── booking-confirmation/
│   │   │       ├── booking-confirmation.component.ts
│   │   │       └── booking-confirmation.component.html
│   │   │
│   │   ├── dealerships/
│   │   │   ├── dealerships-list/
│   │   │   │   ├── dealerships-list.component.ts
│   │   │   │   └── dealerships-list.component.html
│   │   │   └── dealership-details/
│   │   │       ├── dealership-details.component.ts
│   │   │       └── dealership-details.component.html
│   │   │
│   │   ├── loan-calculator/
│   │   │   ├── loan-calculator.component.ts
│   │   │   └── loan-calculator.component.html
│   │   │
│   │   ├── price-updates/
│   │   │   ├── price-updates.component.ts
│   │   │   └── price-updates.component.html
│   │   │
│   │   ├── contact/
│   │   │   ├── contact.component.ts
│   │   │   └── contact.component.html
│   │   │
│   │   ├── user-dashboard/
│   │   │   ├── user-dashboard.component.ts
│   │   │   ├── user-dashboard.component.html
│   │   │   └── sections/
│   │   │       ├── profile/
│   │   │       ├── my-bookings/
│   │   │       ├── favorites/
│   │   │       ├── my-reviews/
│   │   │       └── downloaded-brochures/
│   │   │
│   │   ├── dealer-dashboard/
│   │   │   ├── dealer-dashboard.component.ts
│   │   │   ├── dealer-dashboard.component.html
│   │   │   └── sections/
│   │   │       ├── overview/
│   │   │       ├── my-listings/
│   │   │       ├── add-car/
│   │   │       ├── bookings-requests/
│   │   │       └── reviews-management/
│   │   │
│   │   ├── reviews/
│   │   │   ├── reviews.component.ts
│   │   │   └── reviews.component.html
│   │   │
│   │   ├── insurance/
│   │   │   ├── insurance.component.ts
│   │   │   └── insurance.component.html
│   │   │
│   │   ├── maintenance/
│   │   │   ├── maintenance.component.ts
│   │   │   └── maintenance.component.html
│   │   │
│   │   ├── upcoming-models/
│   │   │   ├── upcoming-models.component.ts
│   │   │   └── upcoming-models.component.html
│   │   │
│   │   ├── blog/
│   │   │   ├── blog-list/
│   │   │   │   ├── blog-list.component.ts
│   │   │   │   └── blog-list.component.html
│   │   │   └── blog-details/
│   │   │       ├── blog-details.component.ts
│   │   │       └── blog-details.component.html
│   │   │
│   │   ├── faq/
│   │   │   ├── faq.component.ts
│   │   │   └── faq.component.html
│   │   │
│   │   └── admin/
│   │       ├── admin-layout/
│   │       │   ├── admin-layout.component.ts
│   │       │   └── admin-layout.component.html
│   │       ├── dashboard/
│   │       │   ├── admin-dashboard.component.ts
│   │       │   └── admin-dashboard.component.html
│   │       ├── manage-users/
│   │       │   ├── manage-users.component.ts
│   │       │   └── manage-users.component.html
│   │       ├── manage-cars/
│   │       │   ├── manage-cars.component.ts
│   │       │   └── manage-cars.component.html
│   │       ├── manage-bookings/
│   │       │   ├── manage-bookings.component.ts
│   │       │   └── manage-bookings.component.html
│   │       ├── manage-dealers/
│   │       │   ├── manage-dealers.component.ts
│   │       │   └── manage-dealers.component.html
│   │       ├── manage-reviews/
│   │       │   ├── manage-reviews.component.ts
│   │       │   └── manage-reviews.component.html
│   │       └── manage-blog/
│   │           ├── manage-blog.component.ts
│   │           └── manage-blog.component.html
│   │
│   ├── data/
│   │   ├── cars.data.ts
│   │   ├── dealers.data.ts
│   │   ├── users.data.ts
│   │   ├── bookings.data.ts
│   │   ├── reviews.data.ts
│   │   ├── blog.data.ts
│   │   ├── insurance.data.ts
│   │   ├── maintenance.data.ts
│   │   ├── upcoming-cars.data.ts
│   │   └── faq.data.ts
│   │
│   ├── models/
│   │   ├── car.model.ts
│   │   ├── user.model.ts
│   │   ├── dealer.model.ts
│   │   ├── booking.model.ts
│   │   ├── review.model.ts
│   │   ├── blog.model.ts
│   │   ├── insurance.model.ts
│   │   ├── maintenance.model.ts
│   │   └── faq.model.ts
│   │
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.routes.ts
│
├── assets/
│   ├── images/
│   │   ├── cars/
│   │   ├── dealers/
│   │   ├── blog/
│   │   ├── brands/
│   │   └── hero/
│   └── brochures/
│       └── (fake PDF placeholders)
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
├── styles.css
└── index.html
```

---

## Routing Structure

```ts
// app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'cars/:id', component: CarDetailsComponent },
  { path: 'search', component: CarSearchComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'test-drive/:carId', component: BookingFormComponent, canActivate: [AuthGuard] },
  { path: 'booking-confirmation/:id', component: BookingConfirmationComponent, canActivate: [AuthGuard] },
  { path: 'dealerships', component: DealershipsListComponent },
  { path: 'dealerships/:id', component: DealershipDetailsComponent },
  { path: 'loan-calculator', component: LoanCalculatorComponent },
  { path: 'price-updates', component: PriceUpdatesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'insurance', component: InsuranceComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'upcoming-models', component: UpcomingModelsComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:id', component: BlogDetailsComponent },
  { path: 'faq', component: FaqComponent },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dealer',
    component: DealerDashboardComponent,
    canActivate: [AuthGuard, DealerGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: DealerOverviewComponent },
      { path: 'listings', component: DealerListingsComponent },
      { path: 'add-car', component: AddCarComponent },
      { path: 'edit-car/:id', component: AddCarComponent },
      { path: 'bookings', component: DealerBookingsComponent },
      { path: 'reviews', component: DealerReviewsComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'cars', component: ManageCarsComponent },
      { path: 'bookings', component: ManageBookingsComponent },
      { path: 'dealers', component: ManageDealersComponent },
      { path: 'reviews', component: ManageReviewsComponent },
      { path: 'blog', component: ManageBlogComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
```

---

## Pages & Components (Detailed)

---

### 1. Home Page

**Route:** `/`
**File:** `features/home/home.component.ts`
**Description:** Landing page with multiple sections to attract visitors and showcase the platform.

#### Sections:

**A. Hero Section** (`sections/hero/`)
- Full-width banner with background image of a luxury car
- Headline: "Find Your Perfect Car"
- Subheadline: "Browse thousands of new and used cars from top dealerships"
- **Search Bar** with 3 dropdown fields (Make, Model, Year) + `Search Cars` button → navigates to `/cars` with query params
- **Buttons:**
  - `Search Cars` → `[click]="searchCars()"` → navigates to `/search?make=X&model=Y&year=Z`
  - `Browse All Cars` → `[routerLink]="['/cars']"` → opens car listing page
- Background overlay gradient for readability

**B. Stats Bar Section** (`sections/stats/`)
- 4 animated counters displayed horizontally:
  - `10,000+` Cars Listed
  - `500+` Verified Dealers
  - `50,000+` Happy Customers
  - `4.9★` Average Rating
- Counters animate from 0 to final value on scroll (IntersectionObserver)

**C. Featured Cars Section** (`sections/featured-cars/`)
- Title: "Featured Cars"
- Subtitle: "Hand-picked vehicles for you"
- Grid of 6 `<app-car-card>` components showing featured cars
- Tabs: `New Cars` | `Used Cars` | `Electric`
- **Buttons on each card:**
  - `View Details` → `[routerLink]="['/cars', car.id]"`
  - `♡ Save` → `favoriteService.toggle(car.id)` — toggles heart icon
  - `+ Compare` → `compareService.add(car)` — adds to compare list
- `View All Cars` button at bottom → `[routerLink]="['/cars']"`

**D. Browse by Brand Section** (`sections/brands/`)
- Title: "Shop by Brand"
- Horizontal scrollable row of brand logos (Toyota, BMW, Mercedes, Honda, Ford, Hyundai, Kia, Tesla, Audi, Nissan)
- Each brand logo is a clickable card → `[routerLink]="['/cars']" [queryParams]="{ brand: brand.name }"`
- Clicking brand navigates to `/cars?brand=Toyota`

**E. Why Choose Us Section** (`sections/why-choose-us/`)
- 4 feature cards with icons:
  - ✅ Verified Dealers — "All dealers are verified and trusted"
  - 🔍 Smart Search — "Advanced filters to find your ideal car"
  - 🚗 Test Drive — "Book test drives in just a few clicks"
  - 💰 Best Prices — "Compare prices across hundreds of dealers"

**F. Upcoming Models Teaser Section**
- Title: "Coming Soon"
- 3 upcoming car cards with blurred/teaser images, release date, and `Notify Me` button
- `Notify Me` button → `notificationService.subscribe(car.id)` → shows toast "You'll be notified when this model launches"
- `See All Upcoming Models` → `[routerLink]="['/upcoming-models']"`

**G. Testimonials Section** (`sections/testimonials/`)
- Carousel/slider with 5 customer reviews
- Each card: user avatar, name, star rating, review text
- Auto-slides every 4 seconds
- Manual navigation with left/right arrows
- Dots indicator at bottom

**H. Blog Teaser Section**
- Title: "Latest from Our Blog"
- 3 latest blog post cards with image, category badge, title, date, `Read More` button → `[routerLink]="['/blog', post.id]"`
- `View All Articles` → `[routerLink]="['/blog']"`

**I. Newsletter Section**
- Title: "Stay Updated"
- Email input field + `Subscribe` button
- `subscribe()` → validates email, shows toast "Subscribed successfully!"

---

### 2. User Auth (Register / Login)

#### Login Page
**Route:** `/login`
**File:** `features/auth/login/login.component.ts`

**Form Fields (Reactive Form):**
- Email — `[type]="email"` — required, email validator
- Password — `[type]="password"` — required, minLength 6
- Remember Me — checkbox

**Buttons:**
- `Login` → `onLogin()`:
  - validates form
  - calls `authService.login(email, password)`
  - if admin credentials → redirect to `/admin`
  - if dealer credentials → redirect to `/dealer`
  - else → redirect to `/dashboard`
  - shows toast on success/failure
- `Forgot Password?` → shows inline modal with email input + `Send Reset Link` button → `authService.sendResetLink(email)` → toast "Reset link sent (demo)"
- `Don't have an account? Register` → `[routerLink]="['/register']"`
- `Continue as Guest` → `[routerLink]="['/cars']"`
- Social login buttons (UI only, no function): `Login with Google`, `Login with Facebook`

**Validation Messages:**
- "Email is required"
- "Please enter a valid email"
- "Password is required"
- "Password must be at least 6 characters"

---

#### Register Page
**Route:** `/register`
**File:** `features/auth/register/register.component.ts`

**Form Fields (Reactive Form):**
- Full Name — required, minLength 3
- Email — required, email validator
- Phone Number — required, pattern validator (Egyptian: 01XXXXXXXXX)
- Password — required, minLength 8
- Confirm Password — required, must match Password
- Role — radio buttons: `Buyer` | `Dealer`
- (If Dealer selected) Dealership Name — required
- (If Dealer selected) Dealership Address — required
- Terms & Conditions — checkbox, required

**Buttons:**
- `Create Account` → `onRegister()`:
  - validates all fields
  - calls `authService.register(formData)`
  - saves to localStorage
  - redirects to `/dashboard` (buyer) or `/dealer` (dealer)
  - shows success toast
- `Already have an account? Login` → `[routerLink]="['/login']"`

---

### 3. Car Listings Page

**Route:** `/cars`
**File:** `features/cars/car-list/car-list.component.ts`
**Description:** Displays all available cars with sidebar filters and sorting.

#### Layout:
- Left sidebar (filters) + Right main content (car grid)
- Mobile: filters collapse into a drawer/overlay

#### Sidebar Filters:
Each filter updates the displayed cars in real-time via `filterCars()`:

- **Make/Brand** — checkboxes: Toyota, BMW, Mercedes, Honda, Ford, Hyundai, Kia, Tesla, Audi, Nissan, Chevrolet, Lexus
- **Body Type** — checkboxes: Sedan, SUV, Coupe, Hatchback, Pickup, Van, Electric
- **Year Range** — dual slider: 2015 → 2024
- **Price Range** — dual slider: $5,000 → $150,000
- **Mileage** — dropdown: Any, Under 10k km, 10k-50k km, 50k-100k km, Over 100k km
- **Fuel Type** — checkboxes: Petrol, Diesel, Electric, Hybrid
- **Transmission** — radio: Any, Automatic, Manual
- **Color** — color swatches (8 colors)
- **Condition** — radio: Any, New, Used, Certified Pre-Owned
- **Seats** — checkbox: 2, 4, 5, 7, 8+

**Filter Buttons:**
- `Apply Filters` → `applyFilters()` — updates car grid
- `Reset Filters` → `resetFilters()` — clears all filters

#### Main Content:
- **Sort Dropdown:** "Sort By: Price Low-High | Price High-Low | Newest First | Most Popular | Rating"
- **Results Count:** "Showing 24 of 156 results"
- **View Toggle:** Grid View / List View buttons
- **Car Cards** (grid of 3 columns):
  - Car image
  - Make + Model + Year badge
  - Price (formatted)
  - Mileage, Fuel type, Transmission icons
  - Dealer name
  - Star rating
  - **Buttons:**
    - `View Details` → `[routerLink]="['/cars', car.id]"`
    - `♡` (Save to Favorites) → `favoriteService.toggle(car.id)` — icon fills on save
    - `+ Compare` → `compareService.add(car)` → shows toast "Added to compare"
    - `Book Test Drive` → `[routerLink]="['/test-drive', car.id]"` (only if logged in, else redirect to login)
- **Pagination Component** at bottom: `<app-pagination>` — 10 pages, 24 cars per page

#### Compare Bar (Fixed Bottom):
- Appears when 1+ cars added to compare
- Shows added car thumbnails (max 3)
- `✕` on each → `compareService.remove(car.id)`
- `Compare Now` button (active when 2+ cars) → `[routerLink]="['/compare']"`
- `Clear All` → `compareService.clearAll()`

---

### 4. Car Details Page

**Route:** `/cars/:id`
**File:** `features/cars/car-details/car-details.component.ts`
**Description:** Full details of a single car with image gallery, specs, dealer info, and booking.

#### Sections:

**A. Image Gallery:**
- Main large image with thumbnail strip below (5 images)
- Click thumbnail → updates main image
- `🔍 View Full Screen` button → opens lightbox modal with navigation arrows
- Image count indicator: "1 / 5"

**B. Car Overview:**
- Make, Model, Year, Condition badge (New/Used/CPO)
- Price (formatted with currency pipe)
- `📊 Price History` button → toggles a small line chart showing price over 6 months
- Star rating with count (e.g., "4.7 ★ (83 reviews)")
- `Share` button → copies URL to clipboard + toast "Link copied!"
- `♡ Save to Favorites` button → `favoriteService.toggle(car.id)`
- `+ Add to Compare` button → `compareService.add(car)`

**C. Quick Specs Strip:**
- Year | Mileage | Fuel Type | Transmission | Engine | Body Type
- Each with icon

**D. Full Specifications Table:**
- Tabbed: `Overview` | `Engine & Performance` | `Safety` | `Comfort & Tech` | `Dimensions`
- Each tab shows a two-column table of spec name / value

**E. Features & Options:**
- Displayed as tag chips: "Sunroof", "Leather Seats", "Backup Camera", "GPS Navigation", "Heated Seats", "Blind Spot Monitor", etc.

**F. Download Brochure:**
- `📄 Download Brochure (PDF)` button → `downloadBrochure(car.id)`:
  - if logged in: triggers fake download of PDF + saves to user's `downloadedBrochures` in localStorage
  - if not logged in: redirects to `/login` with return URL

**G. Dealer Information Card:**
- Dealer name, logo, location, phone, rating
- `📞 Call Dealer` button → `tel:` link (shows phone number in a modal)
- `✉️ Message Dealer` button → opens inline message form:
  - Textarea for message
  - `Send Message` button → `dealerService.sendMessage(dealerId, carId, message)` → toast
- `📍 View on Map` button → `[routerLink]="['/dealerships', dealer.id]"`

**H. Test Drive Booking Card (sticky sidebar):**
- Car name
- Date picker: `<input type="date">` (min = tomorrow)
- Time slot selector: radio buttons for available slots (9 AM, 11 AM, 2 PM, 4 PM)
- Name input (pre-filled if logged in)
- Phone input
- `Book Test Drive` button → navigates to `/test-drive/carId` (detailed booking form)
- `This car is available for test drive` green badge

**I. Similar Cars Section:**
- Title: "Similar Cars You May Like"
- 4 car cards filtered by same brand/body type
- Same card buttons as car listing page

**J. Reviews Section:**
- Average rating breakdown (5 stars bars)
- List of 5 most recent reviews
- `See All Reviews` → scrolls to or loads all reviews
- If logged in: `Write a Review` button → opens review form modal

---

### 5. Car Search & Filters

**Route:** `/search`
**File:** `features/cars/car-search/car-search.component.ts`
**Description:** Advanced search page with keyword search + all filters.

#### Components:
- **Search Bar** (top):
  - Text input with placeholder "Search by make, model, or keyword..."
  - `Search` button → `onSearch()` — filters data by keyword
  - Autocomplete dropdown: shows matching car names as you type (via `carService.autocomplete(query)`)

- **Quick Filter Chips** (below search bar):
  - Popular tags: "SUV", "Electric", "Under $30K", "2023+", "Automatic"
  - Click chip → applies filter instantly

- **Advanced Filters Panel** (collapsible):
  - Toggle button: `Show Advanced Filters ▼` / `Hide Filters ▲`
  - All same filters as Car Listings sidebar
  - `Search with Filters` button → `applyAdvancedSearch()`

- **Results Section:**
  - Same grid layout as Car Listings
  - Empty state: "No cars found matching your search" with illustration + `Clear Search` button

---

### 6. Compare Cars Page

**Route:** `/compare`
**File:** `features/compare/compare.component.ts`
**Description:** Side-by-side comparison of 2–3 cars.

#### Layout:
- **Add Car Slot** (if less than 3 cars selected):
  - Empty card with `+ Add Car to Compare` button → opens search modal to pick a car
- **Car Columns** (2 or 3 side by side):
  - Top: car image, name, price
  - `✕ Remove` button on each → `compareService.remove(car.id)`
- **Comparison Table:**
  - Rows: Price, Year, Mileage, Engine, Horsepower, Fuel Type, Transmission, Body Type, Seats, Safety Rating, Fuel Economy, Top Speed, Warranty
  - Cells highlighted GREEN for best value (e.g., lowest price, lowest mileage)
  - Cells highlighted RED for worst value
- **Buttons at bottom:**
  - `Book Test Drive` under each car → navigates to `/test-drive/carId`
  - `View Details` under each car → navigates to `/cars/carId`
  - `Clear All & Start Over` → `compareService.clearAll()` → resets page

---

### 7. Download Brochures

**Functionality** (not a separate page — integrated in Car Details)
**File:** `core/services/car.service.ts` — `downloadBrochure(carId)` method

**How It Works:**
- `downloadBrochure(carId: string)`:
  1. Checks `authService.isLoggedIn()` — if false, redirects to `/login?return=/cars/carId`
  2. Simulates a download by creating a `<a>` tag with `download` attribute pointing to `assets/brochures/car-brochure.pdf`
  3. Saves `{ carId, carName, downloadDate }` to user's profile in localStorage
  4. Shows toast: "Brochure downloaded successfully!"
- In User Dashboard under `Downloaded Brochures` tab, user sees list of all downloaded brochures with `Re-download` button

---

### 8. Test Drive Booking

**Route:** `/test-drive/:carId`
**File:** `features/booking/booking-form/booking-form.component.ts`
**Guard:** `AuthGuard` (must be logged in)

#### Form Steps (Multi-step form — 3 steps):

**Step 1: Choose Date & Time**
- Car summary card (image, name, price)
- Date picker — min date = tomorrow, max = 30 days from now
- Available time slots shown as toggle buttons: 9:00 AM, 10:00 AM, 11:00 AM, 12:00 PM, 2:00 PM, 3:00 PM, 4:00 PM
- Some slots shown as disabled (already booked) — grey, unclickable
- `Next →` button → validates date + time selected → goes to Step 2

**Step 2: Your Information**
- Full Name — pre-filled from user profile
- Email — pre-filled
- Phone Number — pre-filled
- National ID / License number — text input
- Any special requests? — textarea (optional)
- `← Back` button → goes to Step 1
- `Next →` button → validates all fields → goes to Step 3

**Step 3: Confirm Booking**
- Summary card:
  - Car details (image, name, year)
  - Dealership name + address
  - Date + Time selected
  - Your Name + Phone
- Checkbox: "I confirm I will attend the test drive"
- `← Back` button → goes to Step 2
- `Confirm Booking` button → `onConfirmBooking()`:
  1. Calls `bookingService.createBooking(bookingData)`
  2. Saves to localStorage
  3. Navigates to `/booking-confirmation/:id`
  4. Shows success toast

**Booking Confirmation Page (`/booking-confirmation/:id`):**
- Large ✅ green checkmark
- "Booking Confirmed!" heading
- Booking reference number (e.g., BK-2024-0032)
- Summary: Car, Date, Time, Dealership
- `📅 Add to Calendar` button → generates `.ics` file download
- `View My Bookings` → `[routerLink]="['/dashboard']"` (bookings tab)
- `Browse More Cars` → `[routerLink]="['/cars']"`

---

### 9. View Car Dealerships

**Route:** `/dealerships`
**File:** `features/dealerships/dealerships-list/dealerships-list.component.ts`
**Description:** List of all dealerships with map placeholder and filters.

#### Features:
- **Search bar:** search by dealership name or city
- **Filter by Brand** — dropdown (Toyota, BMW, etc.)
- **Filter by City** — dropdown (Cairo, Alexandria, Giza, etc.)
- **Sort by:** Rating | Most Cars | Nearest
- **Dealership Cards** (grid 2-3 cols):
  - Logo, name, city, address, phone
  - Rating stars + review count
  - Brands sold (chips)
  - "X Cars Available" badge
  - **Buttons:**
    - `View Dealership` → `[routerLink]="['/dealerships', dealer.id]"`
    - `📞 Call Now` → `tel:` link
    - `✉️ Send Message` → opens contact modal

**Dealership Details Page** (`/dealerships/:id`):
- Banner image + logo
- Full address, phone, working hours
- Map placeholder (static image with "View on Google Maps" link)
- **Working Hours Table:**
  - Sun–Thu: 9:00 AM – 8:00 PM
  - Fri: Closed
  - Sat: 10:00 AM – 6:00 PM
- **Cars Available at This Dealership:** grid of car cards
- **Customer Reviews section**
- **Contact Form:**
  - Name, Email, Phone, Message, Subject dropdown (Inquiry, Test Drive, Price Negotiation)
  - `Send Message` button → `dealerService.sendMessage()` → toast

---

### 10. Car Loan Calculator

**Route:** `/loan-calculator`
**File:** `features/loan-calculator/loan-calculator.component.ts`
**Description:** Interactive loan calculator with real-time results.

#### Inputs:
- **Car Price** — number input or range slider: $5,000 – $200,000 (step: $1,000)
- **Down Payment** — number input or range slider: $0 – car price (step: $500)
- **Down Payment %** — auto-calculated from amount (two-way sync)
- **Loan Term** — button group: `12`, `24`, `36`, `48`, `60`, `72`, `84` months
- **Interest Rate (APR)** — range slider: 3% – 25% (step: 0.1%)
- **Trade-in Value** — number input (optional): $0 – $50,000

#### Results (updates in real-time as inputs change):
- **Monthly Payment:** `$1,245.67` — large prominent display
- **Total Loan Amount:** `$45,000`
- **Total Interest Paid:** `$8,740`
- **Total Cost (Price + Interest):** `$63,740`
- **Amortization Chart:** bar/line chart showing balance over months

#### Buttons:
- `Calculate` button → `calculateLoan()` using standard amortization formula
- `Reset` button → `resetCalculator()` — clears all inputs to defaults
- `📋 Copy Results` → copies results summary to clipboard
- `📄 Download Amortization Table` → generates and downloads a table as CSV showing monthly breakdown
- `Apply for Financing` button (UI only) → opens modal: "Contact a dealer to apply for financing" with dealer list

#### Formula (inside `loan-calculator.service.ts`):
```
monthlyRate = APR / 12 / 100
loanAmount = carPrice - downPayment - tradeIn
monthlyPayment = loanAmount * (monthlyRate * (1 + monthlyRate)^term) / ((1 + monthlyRate)^term - 1)
```

---

### 11. Car Price Updates

**Route:** `/price-updates`
**File:** `features/price-updates/price-updates.component.ts`
**Description:** Shows recent price changes, new arrivals, and price alerts.

#### Sections:

**A. Recent Price Drops:**
- Cards showing cars whose price was recently reduced
- Shows original price (strikethrough) + new price + savings badge
- `View Car` button → `[routerLink]="['/cars', car.id]"`

**B. Price Alert Setup:**
- Form: Select Car Make, Model, Max Price input, Email
- `Set Price Alert` button → saves alert to localStorage + toast "Alert set!"
- My Active Alerts list with `✕ Remove` button per alert

**C. Market Trends Section:**
- Bar chart: Average price by brand
- Line chart: Price trends over last 6 months for selected brand
- Brand selector dropdown

**D. New Arrivals This Week:**
- Grid of cards with "NEW" badge
- Same card buttons as elsewhere

---

### 12. Contact Dealerships

**Route:** `/contact`
**File:** `features/contact/contact.component.ts`
**Description:** General contact page + quick dealer contact.

#### Sections:

**A. General Contact Form:**
- Name, Email, Phone, Subject (dropdown), Message (textarea)
- `Send Message` button → `onSendMessage()` → validates → saves to localStorage → toast "Message sent!"

**B. Find a Dealer Form:**
- City dropdown + Brand dropdown
- `Find Dealers Near Me` → filters dealer list below
- Results: dealer cards with call/message buttons

**C. FAQ Quick Links:**
- 5 most common questions with links to `/faq`

**D. Contact Info:**
- Platform email, phone, working hours
- Social media links (icons, no real links)

---

### 13. User Dashboard

**Route:** `/dashboard`
**File:** `features/user-dashboard/user-dashboard.component.ts`
**Guard:** `AuthGuard`
**Description:** Personal dashboard for buyers.

#### Sidebar Navigation Tabs:
1. 👤 My Profile
2. 📅 My Bookings
3. ❤️ Saved Cars (Favorites)
4. ⭐ My Reviews
5. 📄 Downloaded Brochures
6. 🔔 Notifications
7. ⚙️ Account Settings

#### Tab 1: My Profile
- Displays: Avatar (letter-based if no image), Full Name, Email, Phone, Member Since
- `Edit Profile` button → toggles inline edit form with Save/Cancel buttons
- Form fields: Full Name, Phone, City, Profile Picture URL

#### Tab 2: My Bookings
- Table with columns: Car, Dealership, Date, Time, Status (Pending/Confirmed/Cancelled/Completed), Actions
- Status badge (color coded)
- **Action buttons per booking:**
  - `View Details` → opens modal with full booking info
  - `Cancel` (if pending/confirmed) → `bookingService.cancel(id)` → confirm dialog → updates status
  - `Re-book` (if cancelled) → navigates to `/test-drive/carId`
  - `Write Review` (if completed) → opens review modal

#### Tab 3: Saved Cars (Favorites)
- Grid of saved car cards
- `✕ Remove` button on each → `favoriteService.remove(car.id)`
- `View Details` → navigates to car
- `Book Test Drive` → navigates to booking
- Empty state: "No saved cars yet. Browse cars →"

#### Tab 4: My Reviews
- List of submitted reviews with car name, rating, review text, date
- `Edit Review` button → `reviewService.update(id, data)` → opens edit modal
- `Delete Review` button → `reviewService.delete(id)` → confirm dialog

#### Tab 5: Downloaded Brochures
- List: Car name, Download date, `Re-download` button

#### Tab 6: Notifications
- List of notifications (new price drop, booking confirmed, etc.)
- `Mark All as Read` button
- Individual `Dismiss` button per notification

#### Tab 7: Account Settings
- Change Password form: Current Password, New Password, Confirm Password, `Update Password` button
- Delete Account button → opens confirm dialog → `authService.deleteAccount()` → logout → home

---

### 14. Dealer Dashboard

**Route:** `/dealer`
**File:** `features/dealer-dashboard/dealer-dashboard.component.ts`
**Guard:** `AuthGuard` + `DealerGuard`
**Description:** Dashboard for car dealers to manage listings and bookings.

#### Sidebar Navigation:
1. 📊 Overview
2. 🚗 My Listings
3. ➕ Add New Car
4. 📅 Booking Requests
5. ⭐ Customer Reviews
6. ⚙️ Dealer Settings

#### Tab 1: Overview
- Stat cards:
  - Total Active Listings: 24
  - Pending Bookings: 7
  - Test Drives This Month: 32
  - Average Rating: 4.6 ★
- Recent Activity Feed (last 5 bookings, last 5 reviews)
- Quick Action buttons: `+ Add New Car`, `View Bookings`

#### Tab 2: My Listings
- Table: Car Image | Make/Model | Year | Price | Status (Active/Sold/Draft) | Views | Actions
- **Action buttons per listing:**
  - `Edit` → navigates to `/dealer/edit-car/:id`
  - `Mark as Sold` → `carService.markSold(id)` → badge changes
  - `Deactivate` / `Activate` toggle
  - `Delete` → confirm dialog → `carService.deleteCar(id)`
- Search bar above table to filter listings
- `+ Add New Car` button at top

#### Tab 3: Add / Edit Car
- Multi-section form:
  - **Basic Info:** Make (dropdown), Model, Year, Condition (New/Used/CPO), Body Type, Color (color picker), VIN
  - **Engine & Specs:** Engine size, Cylinders, Horsepower, Transmission, Fuel Type, Fuel Economy
  - **Pricing:** Price, Negotiable (checkbox), Previous Price (if used)
  - **Details:** Mileage (if used), Seats, Doors, Features checklist (50+ options with checkboxes)
  - **Images:** Image URL inputs (up to 8 images) with preview thumbnails
  - **Description:** Textarea with character counter
- **Buttons:**
  - `Save as Draft` → `carService.saveDraft(formData)` → toast
  - `Publish Listing` → `carService.publishCar(formData)` → toast + redirect to listings
  - `Cancel` → confirm "Discard changes?" dialog → back to listings

#### Tab 4: Booking Requests
- Table: Customer Name | Car | Date | Time | Phone | Status | Actions
- **Action buttons:**
  - `Confirm` (if pending) → `bookingService.confirm(id)` → status changes + toast
  - `Reject` (if pending) → `bookingService.reject(id)` → shows reason input → saves
  - `View Details` → opens full booking modal
  - `Mark Completed` (if confirmed + date passed) → `bookingService.complete(id)`
- Filter by Status: All | Pending | Confirmed | Rejected | Completed
- Date range filter

#### Tab 5: Customer Reviews
- List of all reviews for this dealer's cars
- Shows: Reviewer name, car, rating, review text, date
- `Reply` button → toggles inline reply textarea + `Send Reply` button → `reviewService.replyToReview(id, reply)`
- `Flag as Inappropriate` button → `reviewService.flag(id)` → toast "Reported to admin"

#### Tab 6: Dealer Settings
- Dealership Name, Address, Phone, Email, Logo URL, Working Hours
- `Save Changes` button → `dealerService.updateProfile(data)`

---

### 15. Review & Rating System

**Integrated in:** Car Details page, User Dashboard (My Reviews), Dealer Dashboard (Reviews)
**File:** `core/services/review.service.ts`

#### Write Review Modal:
- **Triggered by:** `Write a Review` button on Car Details page (only if user has completed a test drive of that car, else shows "Book a test drive first")
- **Form:**
  - Star rating selector (1–5 stars, click to select) — `<app-star-rating [editable]="true">`
  - Rating categories (each 1–5 stars): Exterior, Interior, Performance, Value for Money, Dealer Service
  - Written review textarea (min 20 chars, max 500 chars) — character counter shown
  - `Would you recommend this car?` — Yes/No radio
  - `Submit Review` button → `reviewService.submitReview(reviewData)`:
    - Saves to localStorage
    - Updates car's average rating
    - Shows toast "Review submitted!"
    - Closes modal
  - `Cancel` button → closes modal

#### Review Display:
- `<app-star-rating [rating]="car.rating" [editable]="false">`
- Each review: avatar, name, date, star rating, categories breakdown, written text, helpful count
- `👍 Helpful (12)` button → `reviewService.markHelpful(reviewId)` — increments count
- `Report` link → small dropdown "Spam | Offensive | Irrelevant" → `reviewService.report(reviewId, reason)` → toast

---

### 16. Car Insurance Information

**Route:** `/insurance`
**File:** `features/insurance/insurance.component.ts`
**Description:** Educational page about car insurance types with comparison tool.

#### Sections:

**A. Insurance Types Cards:**
- Third Party, Comprehensive, Third Party + Fire & Theft
- Each card: icon, name, description, what's covered list, average price range
- `Get Quote` button → opens quote form modal

**B. Insurance Comparison Tool:**
- Select up to 3 insurance types
- Side-by-side comparison table: Coverage, Price Range, Recommended For, Pros, Cons
- Highlighted best value column

**C. Insurance FAQ Accordion:**
- 10 Q&A items — click question to expand/collapse answer

**D. Insurance Tips Section:**
- Numbered list of tips for getting best insurance price

**E. Insurance Providers Section:**
- Grid of major insurance companies (logos + ratings)
- `Visit Website` button (UI only)

---

### 17. Car Maintenance Guide

**Route:** `/maintenance`
**File:** `features/maintenance/maintenance.component.ts`
**Description:** Comprehensive maintenance schedule and tips page.

#### Sections:

**A. Maintenance Schedule Calculator:**
- Input: Current Mileage (number input)
- Input: Car Make/Model (dropdown)
- `Generate Schedule` button → `maintenanceService.getSchedule(make, mileage)`:
  - Returns fake maintenance schedule
  - Displays table: Service | Last Done | Next Due (km) | Status (OK/Due Soon/Overdue)
  - Status colored: green/yellow/red

**B. Maintenance Checklist:**
- Categorized accordions:
  - Every 5,000 km (Oil change, Tire rotation, Air filter check)
  - Every 10,000 km (Brake inspection, Fluid levels, Battery check)
  - Every 20,000 km (Spark plugs, Timing belt, AC filter)
  - Every 40,000 km (Brake pads, Transmission fluid, Wheel alignment)
  - Annually (Full inspection, Tire pressure calibration)
- Each item has a checkbox → saved to localStorage
- `Print Schedule` button → `window.print()`

**C. Maintenance Tips Blog Posts:**
- 6 short tip cards with icon, title, short description
- `Read More` opens inline expanded text

**D. Find a Service Center:**
- City dropdown → filters list of fake service centers
- Service center cards: name, location, specialties, rating, phone

---

### 18. Upcoming Car Models

**Route:** `/upcoming-models`
**File:** `features/upcoming-models/upcoming-models.component.ts`
**Description:** Teaser page for cars launching in 2024/2025.

#### Features:
- **Filter tabs:** All | 2024 | 2025 | Electric | Luxury | SUV
- **Countdown Timer** on each featured upcoming car (days until launch)
- **Car Reveal Cards:**
  - Teaser image (slightly blurred or dark overlay)
  - Brand + Model name
  - Expected release date
  - Expected price range
  - Key features (coming features list)
  - `🔔 Notify Me` button → `notificationService.subscribe(car.id)`:
    - If not logged in → redirect to login
    - If logged in → saves subscription to localStorage + changes button to "✓ Notified" (green)
  - `Reserve Now` button → opens reservation modal:
    - Name, Email, Phone, Down Payment (checkbox)
    - `Submit Reservation` → saves → toast "Reservation submitted!"

---

### 19. Blog & Articles

**Route:** `/blog`
**File:** `features/blog/blog-list/blog-list.component.ts`

#### Blog List Page:
- **Category Filter tabs:** All | Buying Guide | Reviews | News | Maintenance | Electric Cars | Tips
- **Search bar:** search articles by keyword
- **Featured Article** (hero card — largest, top of page)
- **Articles Grid** (3 columns):
  - Thumbnail image
  - Category badge
  - Title
  - Author + Date + Read time (e.g., "5 min read")
  - Short excerpt (2 lines)
  - `Read More` → `[routerLink]="['/blog', post.id]"`
- **Popular Tags cloud** (sidebar): clickable tags → filters articles
- **Pagination** at bottom

**Blog Details Page** (`/blog/:id`):
- Large header image
- Article title, author, date, category badge, read time
- **Article body** (paragraphs, headings, inline images — all fake static content)
- **Share buttons:** Share on Facebook, Twitter, Copy Link — `shareService.share(platform, url)`
- **Author Card** at bottom: avatar, name, short bio, link to author's other articles
- **Related Articles** section: 3 cards at bottom
- **Comments Section:**
  - List of comments (author, date, text)
  - `Leave a Comment` form (Name, Email, Comment textarea) — shows only if logged in
  - `Post Comment` button → `blogService.addComment(postId, commentData)` → appends to list
  - `👍 Like Article` button → `blogService.like(postId)` → count increments

---

### 20. FAQ Section

**Route:** `/faq`
**File:** `features/faq/faq.component.ts`
**Description:** Frequently asked questions with search and categories.

#### Features:
- **Search bar** at top — filters questions in real-time as user types
- **Category tabs:** All | Buying | Booking | Payments | Account | Dealers | Technical
- **Accordion list:**
  - Each item: question text, expand/collapse button (▼/▲)
  - Smooth animation on expand/collapse
  - One open at a time (accordion behavior)
  - Answer text with optional links
- **"Still have questions?" CTA** at bottom:
  - `Contact Support` button → `[routerLink]="['/contact']"`

**Sample FAQ items (minimum 30 questions):**
1. How do I book a test drive? — (answer with step-by-step)
2. Is booking a test drive free? — Yes, completely free.
3. Can I cancel a test drive booking?
4. How many cars can I compare at once? — Up to 3 cars.
5. Are the car prices negotiable?
6. How do I download a car brochure?
7. Can I save cars to my favorites without registering?
8. How long is the test drive?
9. What documents do I need for a test drive?
10. How do I become a verified dealer?
... (and 20 more)

---

### 21. Admin Panel

**Route:** `/admin`
**File:** `features/admin/admin-layout/admin-layout.component.ts`
**Guard:** `AuthGuard` + `AdminGuard`
**Description:** Full admin control panel with sidebar navigation.

#### Admin Layout:
- Fixed left sidebar (collapsible to icon-only mode)
- Top header: admin name, notification bell, logout button
- Main content area (router-outlet)

#### Admin Sidebar Navigation:
1. 📊 Dashboard
2. 👥 Manage Users
3. 🚗 Manage Cars
4. 📅 Manage Bookings
5. 🏢 Manage Dealers
6. ⭐ Manage Reviews
7. 📝 Manage Blog
8. 🔔 Notifications
9. ⚙️ Settings

---

#### Admin Dashboard (`/admin/dashboard`):
**Stats Cards:**
- Total Users | Total Cars | Total Bookings | Total Dealers | Revenue (placeholder) | Reviews

**Charts:**
- Line chart: Bookings per month (last 6 months)
- Bar chart: Cars by brand
- Pie chart: User roles distribution
- Bar chart: Top 5 dealerships by bookings

**Recent Activity Feed:**
- Last 10 actions across the platform (new user registered, car added, booking made, review posted)

**Quick Actions:**
- `Add Featured Car`, `Approve Pending Dealers`, `View Flagged Reviews`

---

#### Manage Users (`/admin/users`):
- **Search bar:** search by name or email
- **Filter:** All Roles | Buyer | Dealer | Admin
- **Table columns:** ID | Avatar | Name | Email | Role | Status | Joined Date | Bookings Count | Actions
- **Actions per user:**
  - `View Profile` → opens details modal
  - `Edit Role` dropdown → `adminService.updateUserRole(userId, role)` → toast
  - `Ban/Unban` toggle → `adminService.toggleUserBan(userId)` → status badge updates
  - `Delete User` → confirm dialog → `adminService.deleteUser(userId)`
- **Export CSV** button at top → downloads users table as CSV

---

#### Manage Cars (`/admin/cars`):
- **Search + Filter bar:** by brand, status (Active/Sold/Draft/Flagged)
- **Table:** Image | Make/Model | Year | Price | Dealer | Status | Views | Actions
- **Actions:**
  - `View` → opens car details modal
  - `Edit` → navigates to edit form
  - `Approve` (if pending dealer submission)
  - `Feature` toggle → marks car as featured on home page
  - `Delete` → confirm dialog
- **Bulk actions:** Select multiple → `Delete Selected`, `Approve Selected`

---

#### Manage Bookings (`/admin/bookings`):
- **Filter:** All | Pending | Confirmed | Cancelled | Completed
- **Date range filter**
- **Table:** ID | Customer | Car | Dealer | Date | Time | Status | Actions
- **Actions:**
  - `View Details` → modal
  - `Force Cancel` → `adminService.cancelBooking(id)` → confirm dialog
  - `Mark Completed`

---

#### Manage Dealers (`/admin/dealers`):
- **Tabs:** All Dealers | Pending Approval | Verified | Suspended
- **Table:** Logo | Name | Email | City | Brands | Cars Count | Rating | Status | Actions
- **Actions:**
  - `View Profile` → dealer details modal
  - `Approve` (if pending) → `adminService.approveDealer(id)` → status changes to Verified
  - `Suspend` → confirm dialog + reason input → `adminService.suspendDealer(id, reason)`
  - `Verify/Unverify` → toggles verified badge
  - `Delete` → confirm dialog

---

#### Manage Reviews (`/admin/reviews`):
- **Tabs:** All Reviews | Flagged Reviews | Approved
- **Table:** Reviewer | Car | Rating | Review Text | Date | Status | Actions
- **Actions:**
  - `View Full Review` → modal
  - `Approve` → removes from flagged → `adminService.approveReview(id)`
  - `Delete` → `adminService.deleteReview(id)`

---

#### Manage Blog (`/admin/blog`):
- **Table:** Thumbnail | Title | Category | Author | Date | Status (Draft/Published) | Views | Actions
- **Actions:**
  - `Edit` → opens blog editor (title, category, content textarea, image URL, tags)
  - `Publish/Unpublish` toggle
  - `Delete` → confirm dialog
- `+ Write New Article` button → opens creation form

---

## Services

All services use `BehaviorSubject` for reactive state and `localStorage` for persistence.

### `auth.service.ts`
```ts
// Properties
currentUser$: BehaviorSubject<User | null>
isLoggedIn(): boolean
getCurrentUser(): User | null

// Methods
login(email: string, password: string): boolean
register(data: RegisterData): User
logout(): void
sendResetLink(email: string): void
updateProfile(data: Partial<User>): void
deleteAccount(): void
```

### `car.service.ts`
```ts
// Methods
getAllCars(): Car[]
getCarById(id: string): Car | undefined
getCarsByBrand(brand: string): Car[]
searchCars(query: string, filters: CarFilters): Car[]
getFeaturedCars(): Car[]
getRelatedCars(carId: string): Car[]
autocomplete(query: string): string[]
downloadBrochure(carId: string): void
markSold(carId: string): void
deleteCar(carId: string): void
publishCar(data: CarFormData): Car
saveDraft(data: CarFormData): void
```

### `booking.service.ts`
```ts
// Methods
createBooking(data: BookingData): Booking
getBookingsByUser(userId: string): Booking[]
getBookingsByDealer(dealerId: string): Booking[]
getAllBookings(): Booking[]
cancelBooking(bookingId: string): void
confirmBooking(bookingId: string): void
rejectBooking(bookingId: string, reason: string): void
completeBooking(bookingId: string): void
getAvailableSlots(carId: string, date: string): string[]
```

### `dealer.service.ts`
```ts
// Methods
getAllDealers(): Dealer[]
getDealerById(id: string): Dealer | undefined
getDealersByCity(city: string): Dealer[]
getDealersByBrand(brand: string): Dealer[]
updateDealerProfile(id: string, data: Partial<Dealer>): void
sendMessage(dealerId: string, carId: string, message: string): void
approveDealer(id: string): void
suspendDealer(id: string, reason: string): void
```

### `review.service.ts`
```ts
// Methods
getReviewsByCarId(carId: string): Review[]
submitReview(data: ReviewData): Review
updateReview(id: string, data: Partial<Review>): void
deleteReview(id: string): void
markHelpful(reviewId: string): void
replyToReview(reviewId: string, reply: string): void
flagReview(reviewId: string, reason: string): void
approveReview(id: string): void
getAverageRating(carId: string): number
```

### `compare.service.ts`
```ts
compareList$: BehaviorSubject<Car[]>

// Methods
add(car: Car): void          // max 3, shows toast if full
remove(carId: string): void
clearAll(): void
isInCompare(carId: string): boolean
```

### `favorite.service.ts`
```ts
favorites$: BehaviorSubject<string[]>  // array of car IDs

// Methods
toggle(carId: string): void
isFavorite(carId: string): boolean
getFavoriteCars(): Car[]
remove(carId: string): void
```

### `loan-calculator.service.ts`
```ts
// Methods
calculate(carPrice: number, downPayment: number, tradeIn: number, term: number, apr: number): LoanResult
generateAmortizationTable(loanAmount: number, monthlyRate: number, term: number): AmortizationRow[]
```

### `blog.service.ts`
```ts
// Methods
getAllPosts(): BlogPost[]
getPostById(id: string): BlogPost | undefined
getPostsByCategory(category: string): BlogPost[]
searchPosts(query: string): BlogPost[]
addComment(postId: string, comment: CommentData): void
likePost(postId: string): void
```

### `notification.service.ts`
```ts
notifications$: BehaviorSubject<Notification[]>
unreadCount$: BehaviorSubject<number>

// Methods
subscribe(carId: string): void
markAllRead(): void
dismiss(id: string): void
addNotification(data: NotificationData): void
```

### `toast.service.ts`
```ts
// Methods
show(message: string, type: 'success' | 'error' | 'info' | 'warning'): void
```

### `admin.service.ts`
```ts
// Methods
getAllUsers(): User[]
updateUserRole(userId: string, role: string): void
toggleUserBan(userId: string): void
deleteUser(userId: string): void
cancelBooking(id: string): void
approveDealer(id: string): void
suspendDealer(id: string, reason: string): void
approveReview(id: string): void
deleteReview(id: string): void
getStats(): AdminStats
```

---

## Models / Interfaces

### `car.model.ts`
```ts
export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  previousPrice?: number;
  mileage: number;
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'automatic' | 'manual';
  bodyType: 'sedan' | 'suv' | 'coupe' | 'hatchback' | 'pickup' | 'van';
  color: string;
  seats: number;
  doors: number;
  engineSize: string;
  horsepower: number;
  condition: 'new' | 'used' | 'certified';
  features: string[];
  images: string[];
  dealerId: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  status: 'active' | 'sold' | 'draft';
  vin: string;
  description: string;
  createdAt: string;
  fuelEconomy: string;
  safetyRating: number;
}
```

### `user.model.ts`
```ts
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'buyer' | 'dealer' | 'admin';
  city?: string;
  avatar?: string;
  isBanned: boolean;
  createdAt: string;
  favorites: string[];
  downloadedBrochures: string[];
}
```

### `dealer.model.ts`
```ts
export interface Dealer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  logo: string;
  brands: string[];
  rating: number;
  reviewCount: number;
  status: 'pending' | 'verified' | 'suspended';
  workingHours: WorkingHours;
  description: string;
  totalCars: number;
}

export interface WorkingHours {
  [day: string]: string; // e.g. "9:00 AM - 8:00 PM" | "Closed"
}
```

### `booking.model.ts`
```ts
export interface Booking {
  id: string;
  userId: string;
  carId: string;
  dealerId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  nationalId: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
  rejectionReason?: string;
  createdAt: string;
  referenceNumber: string;
}
```

### `review.model.ts`
```ts
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  carId: string;
  dealerId: string;
  rating: number;
  exterior: number;
  interior: number;
  performance: number;
  valueForMoney: number;
  dealerService: number;
  text: string;
  recommended: boolean;
  helpfulCount: number;
  reply?: string;
  isFlagged: boolean;
  isApproved: boolean;
  createdAt: string;
}
```

### `blog.model.ts`
```ts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  thumbnail: string;
  content: string;
  author: string;
  authorBio: string;
  authorAvatar: string;
  readTime: number;
  views: number;
  likes: number;
  comments: Comment[];
  status: 'draft' | 'published';
  createdAt: string;
}

export interface Comment {
  id: string;
  author: string;
  email: string;
  text: string;
  createdAt: string;
}
```

---

## Fake Data (Mock Data)

### `cars.data.ts`
Minimum 50 fake cars covering:
- All brands: Toyota, BMW, Mercedes, Honda, Ford, Hyundai, Kia, Tesla, Audi, Nissan, Chevrolet, Lexus
- All body types: Sedan, SUV, Coupe, Hatchback, Pickup
- All conditions: New, Used, CPO
- Price range: $8,000 – $120,000
- Various colors, years (2018–2024), mileages
- Real-looking features arrays
- Placeholder image URLs (use `https://via.placeholder.com/800x500?text=Car+Image` or unsplash car images)

### `dealers.data.ts`
Minimum 15 fake dealers:
- Various cities: Cairo, Alexandria, Giza, Sharm El-Sheikh, Hurghada
- Each with 3–5 brands
- Rating between 3.8 – 5.0
- Working hours, phone, address

### `users.data.ts`
- 3 test accounts:
  - Admin: `admin@carhub.com` / `admin123`
  - Dealer: `dealer@carhub.com` / `dealer123`
  - Buyer: `user@carhub.com` / `user123`
- 10 additional fake users for admin panel display

### `bookings.data.ts`
- 20 fake bookings across different statuses and users

### `reviews.data.ts`
- 40 fake reviews for various cars

### `blog.data.ts`
- 15 fake blog articles across all categories

### `faq.data.ts`
- 30 FAQ items across all categories

### `upcoming-cars.data.ts`
- 8 upcoming car models (2024/2025)

---

## Guards

### `auth.guard.ts`
```ts
export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) return true;
  router.navigate(['/login'], { queryParams: { return: state.url } });
  return false;
};
```

### `dealer.guard.ts`
```ts
export const DealerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getCurrentUser();
  if (user?.role === 'dealer' || user?.role === 'admin') return true;
  router.navigate(['/dashboard']);
  return false;
};
```

### `admin.guard.ts`
```ts
export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getCurrentUser();
  if (user?.role === 'admin') return true;
  router.navigate(['/']);
  return false;
};
```

---

## Shared Components

### `<app-navbar>`
- Logo (left) → `[routerLink]="['/']"`
- Nav links: Home, Cars, Dealerships, Compare, Blog, Price Updates, More ▼ (dropdown: Insurance, Maintenance, Upcoming, FAQ)
- Right side:
  - `Loan Calculator` button
  - Compare badge button (shows count) → `[routerLink]="['/compare']"`
  - If not logged in: `Login` + `Register` buttons
  - If logged in as Buyer: User avatar + dropdown (Dashboard, Settings, Logout)
  - If logged in as Dealer: Avatar + dropdown (Dealer Panel, Logout)
  - If logged in as Admin: Avatar + `Admin Panel` badge + dropdown
- Mobile: hamburger menu → slide-in drawer with all nav items
- Sticky on scroll with shadow appearing on scroll

### `<app-footer>`
- 4-column layout:
  - Col 1: Logo + tagline + social icons (Facebook, Instagram, Twitter, YouTube)
  - Col 2: Quick Links (Home, Cars, Dealers, Blog, FAQ, Contact)
  - Col 3: For Dealers (Register as Dealer, Dealer Login, Add Listing)
  - Col 4: Contact Info (email, phone, address)
- Bottom bar: Copyright 2024 CarHub | Privacy Policy | Terms of Service

### `<app-car-card>`
**Inputs:**
```ts
@Input() car: Car
@Input() showCompareButton: boolean = true
@Input() showFavoriteButton: boolean = true
```
**Emits:**
- `(viewDetails)` → parent navigates
- `(bookTestDrive)` → parent navigates
- `(addToCompare)` → compareService.add()
- `(toggleFavorite)` → favoriteService.toggle()

### `<app-star-rating>`
```ts
@Input() rating: number        // current rating
@Input() editable: boolean     // false = display only
@Input() maxStars: number = 5
@Output() ratingChange: EventEmitter<number>
```

### `<app-toast>`
- Fixed bottom-right positioned container
- Slide-in animation on appear, slide-out on dismiss
- Types: success (green), error (red), info (blue), warning (yellow)
- Auto-dismiss after 3 seconds
- Manual close `✕` button

### `<app-breadcrumb>`
```ts
@Input() items: { label: string, url?: string }[]
```
Renders: Home > Cars > Toyota Camry 2023

### `<app-confirm-dialog>`
```ts
@Input() title: string
@Input() message: string
@Input() confirmLabel: string = 'Confirm'
@Input() cancelLabel: string = 'Cancel'
@Input() type: 'danger' | 'warning' | 'info'
@Output() confirmed: EventEmitter<void>
@Output() cancelled: EventEmitter<void>
```

### `<app-loader>`
- Spinning circle with branded color
- Used inside pages while `isLoading = true`

### `<app-pagination>`
```ts
@Input() totalItems: number
@Input() itemsPerPage: number = 24
@Input() currentPage: number = 1
@Output() pageChange: EventEmitter<number>
```

---

## Pipes

### `currency-format.pipe.ts`
```ts
// Usage: {{ car.price | currencyFormat }}
// Output: "$24,500"
transform(value: number): string {
  return '$' + value.toLocaleString('en-US');
}
```

### `km-format.pipe.ts`
```ts
// Usage: {{ car.mileage | kmFormat }}
// Output: "45,000 km"
transform(value: number): string {
  return value.toLocaleString('en-US') + ' km';
}
```

### `time-ago.pipe.ts`
```ts
// Usage: {{ post.createdAt | timeAgo }}
// Output: "3 days ago"
transform(value: string): string { /* ... */ }
```

---

## Directives

### `click-outside.directive.ts`
```ts
// Usage: <div (clickOutside)="closeDropdown()">
// Emits event when user clicks outside the host element
```

### `lazy-image.directive.ts`
```ts
// Usage: <img [lazyImage]="imageUrl" />
// Uses IntersectionObserver to load images only when in viewport
// Shows placeholder color until image loads
```

---

## Animations

Define in `app.component.ts` or per-component using Angular's `@angular/animations`:

```ts
// Page transition
trigger('routeAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0 }))
  ])
])

// Card hover
trigger('cardHover', [
  state('default', style({ transform: 'translateY(0)' })),
  state('hovered', style({ transform: 'translateY(-4px)' })),
  transition('default <=> hovered', animate('200ms ease'))
])

// Toast slide
trigger('toastSlide', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
  ])
])

// Accordion expand
trigger('accordion', [
  state('closed', style({ height: '0', overflow: 'hidden' })),
  state('open', style({ height: '*' })),
  transition('closed <=> open', animate('300ms ease'))
])
```

---

## Angular Project Setup Commands

```bash
# Create new Angular project
ng new carhub --routing --style=css --standalone

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# Install Font Awesome
npm install @fortawesome/fontawesome-free

# Add Font Awesome to angular.json styles array:
# "node_modules/@fortawesome/fontawesome-free/css/all.min.css"

# Add Inter font to index.html:
# <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

# Generate all features (example commands)
ng g c features/home/home --standalone
ng g c features/auth/login/login --standalone
ng g c features/auth/register/register --standalone
ng g c features/cars/car-list/car-list --standalone
ng g c features/cars/car-details/car-details --standalone
ng g c features/cars/car-search/car-search --standalone
ng g c features/compare/compare --standalone
ng g c features/booking/booking-form/booking-form --standalone
ng g c features/booking/booking-confirmation/booking-confirmation --standalone
ng g c features/dealerships/dealerships-list/dealerships-list --standalone
ng g c features/dealerships/dealership-details/dealership-details --standalone
ng g c features/loan-calculator/loan-calculator --standalone
ng g c features/price-updates/price-updates --standalone
ng g c features/contact/contact --standalone
ng g c features/user-dashboard/user-dashboard --standalone
ng g c features/dealer-dashboard/dealer-dashboard --standalone
ng g c features/reviews/reviews --standalone
ng g c features/insurance/insurance --standalone
ng g c features/maintenance/maintenance --standalone
ng g c features/upcoming-models/upcoming-models --standalone
ng g c features/blog/blog-list/blog-list --standalone
ng g c features/blog/blog-details/blog-details --standalone
ng g c features/faq/faq --standalone
ng g c features/admin/admin-layout/admin-layout --standalone
ng g c features/admin/dashboard/admin-dashboard --standalone
ng g c features/admin/manage-users/manage-users --standalone
ng g c features/admin/manage-cars/manage-cars --standalone
ng g c features/admin/manage-bookings/manage-bookings --standalone
ng g c features/admin/manage-dealers/manage-dealers --standalone
ng g c features/admin/manage-reviews/manage-reviews --standalone
ng g c features/admin/manage-blog/manage-blog --standalone

# Generate shared components
ng g c shared/components/navbar/navbar --standalone
ng g c shared/components/footer/footer --standalone
ng g c shared/components/car-card/car-card --standalone
ng g c shared/components/star-rating/star-rating --standalone
ng g c shared/components/toast/toast --standalone
ng g c shared/components/breadcrumb/breadcrumb --standalone
ng g c shared/components/confirm-dialog/confirm-dialog --standalone
ng g c shared/components/loader/loader --standalone
ng g c shared/components/pagination/pagination --standalone

# Generate services
ng g s core/services/auth
ng g s core/services/car
ng g s core/services/booking
ng g s core/services/dealer
ng g s core/services/review
ng g s core/services/blog
ng g s core/services/insurance
ng g s core/services/maintenance
ng g s core/services/loan-calculator
ng g s core/services/compare
ng g s core/services/favorite
ng g s core/services/notification
ng g s core/services/admin
ng g s core/services/toast

# Generate pipes
ng g p shared/pipes/currency-format
ng g p shared/pipes/km-format
ng g p shared/pipes/time-ago

# Generate directives
ng g d shared/directives/click-outside
ng g d shared/directives/lazy-image

# Run development server
ng serve --open
```

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@carhub.com | admin123 |
| Dealer | dealer@carhub.com | dealer123 |
| Buyer | user@carhub.com | user123 |

---

*This README was generated as a complete specification for an AI agent to build the CarHub Angular project from scratch. Every page, component, button, function, and service is documented above. All data is fake/mocked — no real backend required.*
