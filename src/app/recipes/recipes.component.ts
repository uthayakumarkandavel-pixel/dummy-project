import {ChangeDetectionStrategy,Component,computed,inject,OnInit,signal} from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

import { Recipe } from '../../models/recipe.model';
import { HoverZoomDirective } from '../directives/hover-zoom-button';
import { RecipeService } from '../services/recipe.service';
import { Loader } from '../common/loader/loader';
import { IngredientService } from '../services/ingredients.service';
import { DeliveryTypeService } from '../services/delivery-type.service';
import { HeaderComponent } from './recipes-header/recipes-header';
import { RecipesCardComponent } from './recipes-card/recipes-card.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [Loader, HoverZoomDirective, HeaderComponent, RouterLink, RecipesCardComponent],
  templateUrl: './recipes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent implements OnInit {

  private readonly recipeService = inject(RecipeService);
  private readonly ingredientService = inject(IngredientService);
  private readonly deliveryTypeService = inject(DeliveryTypeService);

  recipe = signal<Recipe[]>([]);
  loader = signal(false);
  searchText = signal('');

  selectedIngredients = toSignal(
    this.ingredientService.selectedIngredients$,
    { initialValue: [] }
  );

  selectedDeliveryType = toSignal(
    this.deliveryTypeService.selectedDeliveryType,
    { initialValue: '' }
  );

  filteredRecipes = computed(() => {
    const search = this.searchText().trim().toLowerCase();

    if (!search)  return this.recipe();
    

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
    this.recipeService.getRecipes()
      .pipe(map(res => res.recipes))
      .subscribe({
        next: (recipes) => {
          this.recipe.set(recipes);
          this.loader.set(false);
        },
        error: () =>this.loader.set(false)
        
      });
  }

  handleCloseChip(ingredient: string) {
    const updatedIngredients = this.selectedIngredients().filter(
      item => item !== ingredient
    );

    this.ingredientService.reset(updatedIngredients);
  }

  resetFilters(): void {
    this.ingredientService.reset([]);
    this.deliveryTypeService.reset('');
  }
}