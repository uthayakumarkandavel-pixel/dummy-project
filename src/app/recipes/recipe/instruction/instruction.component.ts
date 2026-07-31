import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-instruction',
  imports: [],
  templateUrl: './instruction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class InstructionComponent  {
  @Input() instructions!: string[];
  title:string = 'Instructions';
}
