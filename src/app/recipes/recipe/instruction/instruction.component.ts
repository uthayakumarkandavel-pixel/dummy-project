import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecipesCardComponent } from '../recipes-card/recipes-card.component';

@Component({
  selector: 'app-instruction',
  imports: [RecipesCardComponent],
  templateUrl: './instruction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstructionComponent  {
  @Input() instructions!: string[];
  title:string = 'Instructions';
}
