import { Component, Signal } from '@angular/core';
import { IngredientService } from '../../../services/ingredients';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-selected-ingredients',
  imports: [],
  templateUrl: './selected-ingredients.component.html',
})
export class SelectedIngredientsComponent {
  selectedIngredients: Signal<string[]>;

  constructor(public ingredientService: IngredientService) {
    this.selectedIngredients = toSignal(
      this.ingredientService.selectedIngredients$,
      { initialValue: [] }
    );
    
  }
}