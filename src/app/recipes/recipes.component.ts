import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

import { Recipe } from '../../models/recipe.model';
import { DifficultyHighlightDirective } from '../directives/difficulty-highlight';
import { HoverZoomDirective } from '../directives/hover-zoom-button';
import { RecipeService } from '../services/recipe';
import { Loader } from '../common/loader/loader';


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [DifficultyHighlightDirective, Loader,HoverZoomDirective,RouterLink],
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
    });
  }


  trackByRecipe(index: number, recipe: Recipe): number {
    return recipe.id;
  }

}