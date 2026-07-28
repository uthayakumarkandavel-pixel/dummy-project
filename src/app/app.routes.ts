import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';

export const routes: Routes = [
    {
        path: 'recipe',
        component: RecipesComponent,
    },
    {
        path:'',
        redirectTo:'recipe',
        pathMatch:"full"
    }
];
