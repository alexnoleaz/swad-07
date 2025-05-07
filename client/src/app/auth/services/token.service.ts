import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  set(token: string): void {
    localStorage.setItem('token', token);
  }

  get(): string | null {
    return localStorage.getItem('token');
  }

  remove(): void {
    localStorage.removeItem('token');
  }
}
