import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-form',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  form: FormGroup;

  private readonly fb: FormBuilder;
  private readonly router: Router;
  private readonly taskService: TaskService;

  constructor(fb: FormBuilder, router: Router, taskService: TaskService) {
    this.fb = fb;
    this.router = router;
    this.taskService = taskService;

    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.taskService
      .create({ ...this.form.value, completed: false })
      .subscribe(() => this.router.navigate(['/']));
  }
}
