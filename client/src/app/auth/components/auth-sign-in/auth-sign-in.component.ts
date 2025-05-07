import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-sign-in.component.html',
})
export class SignInComponent implements OnInit {
  redirectUrl = '/';
  form: FormGroup;
  error?: string;

  private readonly fb: FormBuilder;
  private readonly authService: AuthService;
  private readonly router: Router;
  private readonly route: ActivatedRoute;

  constructor(
    fb: FormBuilder,
    authService: AuthService,
    router: Router,
    route: ActivatedRoute
  ) {
    this.fb = fb;
    this.authService = authService;
    this.router = router;
    this.route = route;

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.redirectUrl = this.route.snapshot.queryParamMap.get('redirect') || '/';
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.authService.signIn(this.form.value).subscribe({
      next: () => this.router.navigateByUrl(this.redirectUrl),
      error: () => (this.error = 'Incorrect email or password'),
    });
  }
}
