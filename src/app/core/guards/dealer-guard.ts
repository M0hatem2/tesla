import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const dealerGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const user = authService.getCurrentUser();

  if (user?.role === 'dealer' || user?.role === 'admin') {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
