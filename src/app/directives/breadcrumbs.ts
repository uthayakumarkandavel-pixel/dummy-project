import { Directive, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appBreadcrumb]'
})
export class BreadcrumbDirective {
  private router = inject(Router);

  @Input() breadcrumb!: string | string[];

  @HostListener('click')
  onClick(): void {
    if (Array.isArray(this.breadcrumb)) {
      this.router.navigate(this.breadcrumb);
    } else {        
      this.router.navigate([this.breadcrumb]);
    }
  }
}