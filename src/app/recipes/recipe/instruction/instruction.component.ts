import { ChangeDetectionStrategy, Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-instruction',
  imports: [],
  templateUrl: './instruction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class InstructionComponent implements DoCheck {
  @Input() instructions!: string[];

  ngDoCheck() {
    console.log("Instruction checked");
  }
  toggleIngredients() {
    console.log('hello');
  }
}
