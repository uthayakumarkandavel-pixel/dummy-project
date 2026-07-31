import { ChangeDetectionStrategy, Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-instruction',
  imports: [],
  templateUrl: './instruction.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class InstructionComponent implements DoCheck{
  @Input() instructions!: string[];
    title=''
count=0;
  onButtonClick(){
    alert('Button Click')
  }
  ngDoCheck(): void {
        this.title='Instructions'+this.count;
        this.count++;
    console.log("Do check triggers Instruction");    
  }
}
