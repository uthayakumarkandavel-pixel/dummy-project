
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hoverZoom]'
})
export class HoverZoomDirective {


  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('mouseover')
  onMouseOver() {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '17px');
    this.renderer.addClass(this.el.nativeElement, 'bg-red-600');
    this.renderer.removeClass(this.el.nativeElement, 'bg-red-700');

  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '15px');
    this.renderer.addClass(this.el.nativeElement, 'bg-red-700');
    this.renderer.removeClass(this.el.nativeElement, 'bg-red-600');

  }


}