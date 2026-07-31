import { ChangeDetectionStrategy, Component, computed, DoCheck, inject, OnInit, signal } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.Default
})
export class RecipesComponent implements OnInit,DoCheck{

  private recipeService = inject(RecipeService);
  recipe = signal<Recipe[]>([]);
  loader = signal(false);
  searchText = signal('');

  ngDoCheck(): void {
    console.log('Do Check triggers Recipes page');
    
  }

  filteredRecipes = computed(() => {
    const search = this.searchText().trim().toLowerCase();

    if (!search) {
      return this.recipe();
    }

    return this.recipe().filter(recipe =>
      recipe.name.toLowerCase().includes(search) ||
      recipe.cuisine.toLowerCase().includes(search)
    );
  });
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
}