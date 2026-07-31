import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  imports: [],
  templateUrl: './ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class IngredientComponent {
  @Input() ingredients: string[] | undefined;
  title = 'Ingredients'
}
