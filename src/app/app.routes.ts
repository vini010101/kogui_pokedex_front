import { Routes } from '@angular/router';

export const routes: Routes = [
  // Tela de login
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
  },

  // Redirecionamento inicial para login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Listagem de Pokémon com filtros
  // Listagem de Pokémon com filtros
  {
    path: 'list',
    loadComponent: () => import('./list/list.component').then(c => c.ListComponent),
  },
  // Favoritos
{
  path: 'favorites',
  loadComponent: () =>
    import('./favorites/favorites.component').then(c => c.FavoritesComponent),
},

  // Equipe de batalha
{
  path: 'team',
  loadComponent: () =>
    import('./team/team.component').then(c => c.TeamComponent),
},

  // Detalhes de Pokémon
 // Detalhes de Pokémon
{
  path: 'details/:name', // opcional: prefixo "details" para diferenciar de outras rotas
  loadComponent: () =>
    import('./details/details.component').then(c => c.DetailsComponent),
},

  // Qualquer rota desconhecida
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
