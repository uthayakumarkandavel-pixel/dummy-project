import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  imports: [],
  templateUrl: './chip.html',
})
export class Chip {
  @Input() chipItem!:string;
  @Output() close = new EventEmitter<string>();
}
