import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipes-card',
  imports: [],
  templateUrl: './recipes-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesCardComponent {
  @Input() recipe!:Recipe;
}
