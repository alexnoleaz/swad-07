import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, type Observable, throwError } from 'rxjs';

import { TokenService } from './services/token.service';

export class JwtInterceptor implements HttpInterceptor {
  private readonly tokenService: TokenService;
  private readonly router: Router;

  constructor(tokenService: TokenService, router: Router) {
    this.tokenService = tokenService;
    this.router = router;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.get();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.tokenService.remove();
          this.router.navigate(['/auth/login']);
        }

        return throwError(() => error);
      }),
    );
  }
}
