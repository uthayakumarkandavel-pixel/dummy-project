import { Routes } from '@angular/router';
import { publicGuard } from './guard/public-guard';
import { authGuard } from './guard/auth-guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipe',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'recipe',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./recipes/recipes.component').then(m => m.RecipesComponent),
  },
  {
    path: 'recipe/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./recipes/recipe/recipe.component').then(m => m.RecipeComponent),
  },
  {
    path: '**',
    redirectTo: 'recipe'
  }
];