import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Tasks</h2>
    <ul>
      <li *ngFor="let task of tasks">{{ task.title }}</li>
    </ul>
  `,
})
export class TasksComponent {
  tasks: any[] = [];

  constructor(private tasksService: TasksService) {
    this.tasksService.getTasks().subscribe((res: any) => {
      this.tasks = res;
    });
  }
}
