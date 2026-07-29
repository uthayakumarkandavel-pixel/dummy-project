import { Component, Input } from '@angular/core';
import { BreadcrumbDirective } from '../../directives/breadcrumbs';

@Component({
  selector: 'app-breadcrumbs',
  imports: [BreadcrumbDirective],
  templateUrl: './breadcrumbs.html',
})
export class Breadcrumbs {
  @Input() breadcrumbsItem!:breadcrumbs[];
}
