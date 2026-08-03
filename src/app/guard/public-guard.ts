import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/login.service';


export const publicGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated) {
    return router.createUrlTree(['/recipe']);
  }

  return true;
};