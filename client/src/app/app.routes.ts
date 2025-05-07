import { Routes } from '@angular/router';

import { authGuard } from './auth/auth.guard';
import { SignInComponent } from './auth/components/auth-sign-in/auth-sign-in.component';
import { TaskFormComponent } from './tasks/components/task-form/task-form.component';
import { TaskListComponent } from './tasks/components/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent, canActivate: [authGuard] },
  { path: 'auth/sign-in', component: SignInComponent },
];
