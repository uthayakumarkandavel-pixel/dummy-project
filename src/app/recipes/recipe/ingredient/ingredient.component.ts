import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { IngredientService } from '../../../services/ingredients.service';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipesCardComponent } from '../recipes-card/recipes-card.component';

@Component({
  selector: 'app-ingredient',
  imports: [NgClass,RecipesCardComponent],
  templateUrl: './ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientComponent {
  @Input() ingredients: string[] = [];

  readonly title = 'Select the Ingredients To Buy';
  private readonly ingredientService = inject(IngredientService);

    selectedIngredients = toSignal(
    this.ingredientService.selectedIngredients$,
    { initialValue: [] }
  );


ingredientSelectHandler(ingredient: string) {
  this.ingredientService.toggleIngredient(ingredient);
}

isSelected(ingredient: string): boolean {
  return this.selectedIngredients().includes(ingredient);
}
}