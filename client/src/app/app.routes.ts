import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AuthLoginComponent } from './auth/components/auth-login/auth-login.component';
import { TaskFormComponent } from './tasks/components/task-form/task-form.component';
import { TaskListComponent } from './tasks/components/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: 'auth/login', component: AuthLoginComponent },
];
