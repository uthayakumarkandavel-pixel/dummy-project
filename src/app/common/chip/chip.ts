import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  imports: [],
  template: `<span class="px-3 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium flex gap-2"
    [title]="chipItem">
    {{ chipItem }}
    <i class="pi pi-times cursor-pointer pt-1" (click)="close.emit(chipItem)"></i>
</span>`,
})
export class Chip {
  @Input() chipItem!: string;
  @Output() close = new EventEmitter<string>();
}
