import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeliveryTypeService } from '../../../services/delivery-type.service';
import { RecipesCardComponent } from '../recipes-card/recipes-card.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-delivery-type',
  imports: [RecipesCardComponent,NgClass],
  templateUrl: './delivery-type.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryTypeComponent {

  readonly deliveryTypes = [
    {
      name: 'Door Delivery',
      icon: 'pi pi-home'
    },
    {
      name: 'Store Pickup',
      icon: 'pi pi-shopping-bag'
    },
    {
      name: 'Express Delivery',
      icon: 'pi pi-bolt'
    }
  ];
  private readonly deliveryType = inject(DeliveryTypeService);


  selectedDeliveryType = toSignal(
    this.deliveryType.selectedDeliveryType,
    { initialValue: '' }
  );


  deliveryTypeSelectHandler(ingredient: string) {
    this.deliveryType.toggleDeliveryType(ingredient);
  }

  isSelected(ingredient: string): boolean {
    return this.selectedDeliveryType() === (ingredient);
  }
}
