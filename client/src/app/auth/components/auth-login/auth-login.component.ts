import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-login.component.html',
})
export class AuthLoginComponent {
  form: FormGroup;
  error?: string;

  private readonly fb: FormBuilder;
  private readonly authService: AuthService;
  private readonly router: Router;

  constructor(fb: FormBuilder, authService: AuthService, router: Router) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.authService.signIn(this.form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => (this.error = 'Incorrect email or password'),
    });
  }
}
