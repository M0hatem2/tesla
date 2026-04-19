import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'cars',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'cars/:id',
    renderMode: RenderMode.Server, // Dynamic route - use Server rendering
  },
  {
    path: 'search',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'compare',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'dealerships',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'loan-calculator',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog/:id',
    renderMode: RenderMode.Server, // Dynamic route - use Server rendering
  },
  {
    path: 'faq',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'insurance',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'maintenance',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Server, // Requires authentication
  },
  {
    path: 'test-drive/:carId',
    renderMode: RenderMode.Server, // Dynamic route - use Server rendering
  },
  {
    path: 'dealer',
    renderMode: RenderMode.Server, // Requires authentication
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Server, // Requires authentication
  },
  {
    path: '**',
    renderMode: RenderMode.Server, // Fallback for all other routes
  },
];
