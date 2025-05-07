import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { TokenService } from './services/token.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.get();
  const isAuthRoute =
    req.url.includes('/auth/login') || req.url.includes('/auth/register');

  if (token && !isAuthRoute)
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        tokenService.remove();
        router.navigate(['auth/sign-in']);
      }

      return throwError(error);
    })
  );
};
