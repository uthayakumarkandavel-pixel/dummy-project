import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDifficultyHighlight]'
})
export class DifficultyHighlightDirective {

  @Input()
  difficulty!: string;


  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}


  ngOnChanges() {

    let color = '';

    if (this.difficulty === 'Easy') {
      color = 'green';
    }
    else if (this.difficulty === 'Medium') {
      color = 'orange';
    }
    else if (this.difficulty === 'Hard') {
      color = 'red';
    }


    this.renderer.setStyle(
      this.el.nativeElement,
      'color',
      color
    );

  }

}