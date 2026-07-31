import { Component, Signal } from '@angular/core';
import { IngredientService } from '../../../services/ingredients';
import { toSignal } from '@angular/core/rxjs-interop';
import { Chip } from '../../../common/chip/chip';

@Component({
  selector: 'app-selected-ingredients',
  imports: [Chip],
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

  handleCloseChip(ingredient: string) {
    const updatedIngredients = this.selectedIngredients().filter(
      item => item !== ingredient
    );

    this.ingredientService.reset(updatedIngredients);
  }
}