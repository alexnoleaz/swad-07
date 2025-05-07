import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.get()) return true;

  return router.createUrlTree(['/auth/sign-in'], {
    queryParams: { redirect: state.url },
  });
};
