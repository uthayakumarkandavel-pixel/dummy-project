import { Routes } from '@angular/router';

export const routes: Routes = [
        {
        path:'',
        redirectTo:'recipe',
        pathMatch:"full"
    },
    {
        path: 'recipe',
        loadComponent:()=>import('./recipes/recipes.component').then((m)=>m.RecipesComponent),
    },
    {
        path: 'recipe/:id',
        loadComponent:()=>import('./recipes/recipe/recipe.component').then((m)=>m.RecipeComponent),
    },  
];
