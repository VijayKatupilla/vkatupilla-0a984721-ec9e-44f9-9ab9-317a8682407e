import { Routes } from '@angular/router';
import { LoginComponent } from '../../auth/login.component';
import { TasksComponent } from '../../tasks/tasks.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tasks', component: TasksComponent },
];
