import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { type Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  title = 'task list';
  tasks: Task[] = [];

  private readonly taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.findAll().subscribe((data) => (this.tasks = data));
  }

  deleteTask(id: number): void {
    this.taskService.delete(id).subscribe(() => this.loadTasks());
  }

  toggleTask(task: Task): void {
    this.taskService
      .update({ ...task, completed: !task.completed })
      .subscribe(() => this.loadTasks());
  }
}
