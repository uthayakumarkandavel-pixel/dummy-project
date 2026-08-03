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
import { Chip } from '../common/chip/chip';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    Loader,
    HoverZoomDirective,
    Chip,
    RouterLink,
    InfiniteScrollModule
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

  skip = 0;
  limit = 5;

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
    this.getRecipe(0);
  }

  getRecipe(skip: number): void {
    this.recipeService.getRecipes(skip)
      .pipe(map(res => res.recipes))
      .subscribe({
        next: (recipes) => {

          if (skip === 0) {            
            this.recipe.set(recipes);
          } else {
            this.recipe.update(current => [...current, ...recipes]);
          }

          this.loader.set(false);
        },
        error: () => {
          this.loader.set(false);
        }
      });
  }

  onScrollDown(): void {

    this.skip += this.limit;

    console.log('Loading page:', this.skip);

    this.getRecipe(this.skip);
  }

  handleCloseChip(ingredient: string) {
    const updatedIngredients = this.selectedIngredients().filter(
      item => item !== ingredient
    );

    this.ingredientService.reset(updatedIngredients);
  }

  modalScrollDistance = 2;
  modalScrollThrottle = 200;

  resetFilters(): void {
    this.ingredientService.reset([]);
    this.deliveryTypeService.reset('');
  }
}