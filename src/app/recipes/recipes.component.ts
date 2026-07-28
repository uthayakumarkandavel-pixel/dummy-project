import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../services/recipe';
import { DifficultyHighlightDirective } from '../directives/difficulty-highlight';
import { Loader } from '../loader/loader';
import { HoverZoomDirective } from '../directives/hover-zoom-button';


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [DifficultyHighlightDirective, Loader,HoverZoomDirective],
  templateUrl: './recipes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnInit {

  private recipeService = inject(RecipeService);
  recipe = signal<Recipe[]>([]);
  loader = signal(false);
  ngOnInit(): void {
    this.loader.set(true);
    this.getRecipe();
  }


  getRecipe(): void {
    this.recipeService.getRecipes().pipe(
      map(res => res.recipes)
    ).subscribe(recipes => {
      this.loader.set(false);
      this.recipe.set(recipes);
      console.log(this.loader);

    });
  }


  trackByRecipe(index: number, recipe: Recipe): number {
    return recipe.id;
  }

}