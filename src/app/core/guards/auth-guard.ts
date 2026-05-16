import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


import { TokenService } from '../services/token';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  
  if (tokenService.possuiToken()) {
    return true;
  }
  
  return router.createUrlTree(['/login']);
};
