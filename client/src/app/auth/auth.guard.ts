import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from './services/token.service';

export class AuthGuard implements CanActivate {
  private readonly tokenService: TokenService;
  private readonly router: Router;

  constructor(tokenService: TokenService, router: Router) {
    this.tokenService = tokenService;
    this.router = router;
  }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    const token = this.tokenService.get();
    if (token) return true;

    this.router.navigate(['/auth/login']);
    return false;
  }
}
