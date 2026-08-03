import { Component, inject, input, output } from '@angular/core';
import { Chip } from '../../common/chip/chip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Chip],
  templateUrl: './recipes-header.html',
})
export class HeaderComponent {
  selectedIngredients = input<string[]>([]);
  selectedDeliveryType = input<string | null>(null);
  router= inject(Router);

  closeChip = output<string>();
  reset = output<void>();

  handleCloseChip(item: string) {
    this.closeChip.emit(item);
  }

  handleReset() {
    this.reset.emit();
  }

  navigateToHome() {
    this.router.navigate(['/']); 
  }

}