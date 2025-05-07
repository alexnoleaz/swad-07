import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {}
