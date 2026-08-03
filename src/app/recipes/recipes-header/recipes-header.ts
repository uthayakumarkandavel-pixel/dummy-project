import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { Chip } from '../../common/chip/chip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Chip],
  templateUrl: './recipes-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly selectedIngredients = input<string[]>([]);
  readonly selectedDeliveryType = input<string | null>(null);

  readonly closeChip = output<string>();
  readonly reset = output<void>();

  private readonly router = inject(Router);

  handleCloseChip = (item: string) => this.closeChip.emit(item);

  handleReset = () => this.reset.emit();

  navigateToHome = () => this.router.navigate(['/']);
}