import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, type Observable } from 'rxjs';

import { type AuthResponse } from '../models/auth-response.model';
import { type User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';
  private readonly httpClient: HttpClient;
  private readonly tokenService: TokenService;

  constructor(httpClient: HttpClient, tokenService: TokenService) {
    this.httpClient = httpClient;
    this.tokenService = tokenService;
  }

  signUp(user: User): Observable<AuthResponse> {
    const { id, ...rest } = user;
    return this.httpClient
      .post<AuthResponse>(`${this.apiUrl}/register`, rest)
      .pipe(tap((res) => this.tokenService.set(res.accessToken)));
  }

  signIn(user: User): Observable<AuthResponse> {
    const { email, password } = user;
    return this.httpClient
      .post<AuthResponse>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(tap((res) => this.tokenService.set(res.accessToken)));
  }
}
