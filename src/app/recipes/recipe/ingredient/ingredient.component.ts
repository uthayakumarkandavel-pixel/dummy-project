import { Component, Input } from '@angular/core';
import { IngredientService } from '../../../services/ingredients';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ingredient',
  imports: [NgClass],
  templateUrl: './ingredient.component.html',
})
export class IngredientComponent {
  @Input() ingredients: string[] = [];

  title = 'Ingredients';
  selectedIngredients;
  constructor(public ingredientService: IngredientService) {
    this.selectedIngredients = toSignal(
      this.ingredientService.selectedIngredients$,
      { initialValue: [] }
    );
  }

  ingredientSelectHandler(ingredient: string) {
    this.ingredientService.toggleIngredient(ingredient);
  }

  isSelected(ingredient: string): boolean {
    return this.selectedIngredients().includes(ingredient);
  }
}