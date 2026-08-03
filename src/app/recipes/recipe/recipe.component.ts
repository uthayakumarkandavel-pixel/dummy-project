import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Recipe } from '../../../models/recipe.model';
import { Breadcrumbs } from '../../common/breadcrumbs/breadcrumbs';
import { RecipeService } from '../../services/recipe';
import { Loader } from '../../common/loader/loader';
import { HeaderComponent } from '../recipes-header/recipes-header';
import { DeliveryTypeComponent } from './delivery-type/delivery-type.component';

import { InstructionComponent } from './instruction/instruction.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { IngredientService } from '../../services/ingredients';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeliveryType } from '../../services/delivery-type';

@Component({
  selector: 'app-recipe.component',
  standalone: true,
  imports: [Loader, Breadcrumbs, HeaderComponent,DeliveryTypeComponent,IngredientComponent, InstructionComponent],
  templateUrl: './recipe.component.html',
})
export class RecipeComponent implements OnInit {
  recipe = signal<Recipe | null>(null);
  loader = signal(false);
  
  private ingredientService = inject(IngredientService);
  private deliveryTypeService = inject(DeliveryType);


  private recipeService = inject(RecipeService);
  private activateRoute = inject(ActivatedRoute);
  selectedIngredients = toSignal(
    this.ingredientService.selectedIngredients$,
    { initialValue: [] }
  );

  selectedDeliveryType = toSignal(
    this.deliveryTypeService.selectedDeliveyType,
    { initialValue: '' }
  );

  id = this.activateRoute.snapshot.paramMap.get('id') || "";

  ngOnInit(): void {
    this.loader.set(true);
    this.getRecipe();
  }

  getRecipe(): void {
    this.recipeService.getSingleRecipe(this.id)
      .pipe(map(res => res))
      .subscribe(res => {
        this.loader.set(false);
        this.recipe.set(res);
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