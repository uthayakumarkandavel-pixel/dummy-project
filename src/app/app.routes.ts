import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';

export const routes: Routes = [
        {
        path:'',
        redirectTo:'recipe',
        pathMatch:"full"
    },
    {
        path: 'recipe',
        component: RecipesComponent,
    },
      {
        path: 'recipe/:id',
        component: RecipeComponent,
    },  
];
