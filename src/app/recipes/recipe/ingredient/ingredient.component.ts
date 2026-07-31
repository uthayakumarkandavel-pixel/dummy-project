import { ChangeDetectionStrategy, Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  imports: [],
  templateUrl: './ingredient.component.html',
  changeDetection:ChangeDetectionStrategy.Default
})
export class IngredientComponent implements DoCheck{
  @Input() ingredients:string[]|undefined;
  title=''
  count=0;
    ngDoCheck(): void {
        this.title='Ingredient'+this.count;
        this.count++;
    console.log("Do check triggers Ingredients");    
  }
}
