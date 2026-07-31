import { ChangeDetectionStrategy, Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  imports: [],
  templateUrl: './ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class IngredientComponent implements DoCheck {
  @Input() ingredients:string[]|undefined;
  ngDoCheck() {
    console.log("Ingredient checked");
  }
}
