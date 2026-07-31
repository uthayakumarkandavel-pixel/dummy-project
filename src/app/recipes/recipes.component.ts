import {
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

import { Recipe } from '../../models/recipe.model';
import { DifficultyHighlightDirective } from '../directives/difficulty-highlight';
import { HoverZoomDirective } from '../directives/hover-zoom-button';
import { RecipeService } from '../services/recipe';
import { Loader } from '../common/loader/loader';
import { IngredientService } from '../services/ingredients';
import { DeliveryType } from '../services/delivery-type';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    DifficultyHighlightDirective,
    Loader,
    HoverZoomDirective,
    RouterLink
  ],
  templateUrl: './recipes.component.html',
})
export class RecipesComponent implements OnInit {

  private recipeService = inject(RecipeService);
  private ingredientService = inject(IngredientService);
  private deliveryTypeService = inject(DeliveryType);

  recipe = signal<Recipe[]>([]);
  loader = signal(false);
  searchText = signal('');

  selectedIngredients = toSignal(
    this.ingredientService.selectedIngredients$,
    { initialValue: [] }
  );

  selectedDeliveryType = toSignal(
    this.deliveryTypeService.selectedDeliveyType,
    { initialValue: '' }
  );

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

  resetFilters(): void {
    this.ingredientService.reset();
    this.deliveryTypeService.reset();

  }
}