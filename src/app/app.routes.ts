import { Routes } from '@angular/router';
import { List } from './list/list';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: List,
  },
  {
    path: ':name',
    loadComponent: () => import('./details/details').then(c => c.default),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
