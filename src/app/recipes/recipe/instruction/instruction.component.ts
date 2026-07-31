import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-instruction',
  imports: [],
  templateUrl: './instruction.component.html',
})
export class InstructionComponent  {
  @Input() instructions!: string[];
  title:string = 'Instructions';
}
