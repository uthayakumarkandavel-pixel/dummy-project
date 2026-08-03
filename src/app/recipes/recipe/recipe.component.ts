import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Recipe } from '../../../models/recipe.model';
import { Breadcrumbs } from '../../common/breadcrumbs/breadcrumbs';
import { RecipeService } from '../../services/recipe.service';
import { Loader } from '../../common/loader/loader';
import { HeaderComponent } from '../recipes-header/recipes-header';
import { DeliveryTypeComponent } from './delivery-type/delivery-type.component';

import { InstructionComponent } from './instruction/instruction.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { IngredientService } from '../../services/ingredients.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeliveryTypeService } from '../../services/delivery-type.service';

@Component({
  selector: 'app-recipe.component',
  standalone: true,
  imports: [Loader, Breadcrumbs, HeaderComponent, DeliveryTypeComponent, IngredientComponent, InstructionComponent],
  templateUrl: './recipe.component.html',
})
export class RecipeComponent implements OnInit {
  recipe = signal<Recipe | null>(null);
  loader = signal(false);

  private readonly ingredientService = inject(IngredientService);
  private readonly deliveryTypeService = inject(DeliveryTypeService);

  private readonly recipeService = inject(RecipeService);
  private readonly activateRoute = inject(ActivatedRoute);

  selectedIngredients = toSignal(
    this.ingredientService.selectedIngredients$,
    { initialValue: [] }
  );

  selectedDeliveryType = toSignal(
    this.deliveryTypeService.selectedDeliveryType,
    { initialValue: '' }
  );

  readonly id = this.activateRoute.snapshot.paramMap.get('id') ?? "";

  ngOnInit(): void {
    this.loader.set(true);
    this.getRecipe();
  }

  getRecipe(): void {
    this.recipeService.getSingleRecipe(this.id).subscribe(recipe => {
      this.recipe.set(recipe);
      this.loader.set(false);
    });
  }

  handleCloseChip(ingredient: string) {
    this.ingredientService.reset(
      this.selectedIngredients().filter(item => item !== ingredient)
    );
  }

  resetFilters(): void {
    this.ingredientService.reset([]);
    this.deliveryTypeService.reset('');
  }

protected get recipeInfo() {
  const r = this.recipe();
  if (!r) return [];

  return [
    { icon: 'pi pi-star-fill text-yellow-500', value: r.rating, label: 'rating' },
    { icon: 'pi pi-clock text-orange-600', value: `${r.prepTimeMinutes} mins Prep`, label: 'prep' },
    { icon: 'pi pi-stopwatch text-orange-600', value: `${r.cookTimeMinutes} mins Cook`, label: 'cook' },
    { icon: 'pi pi-users text-orange-600', value: `${r.servings} Servings`, label: 'servings' }
  ];
}

}