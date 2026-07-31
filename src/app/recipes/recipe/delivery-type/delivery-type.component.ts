import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DeliveryType } from '../../../services/delivery-type';

@Component({
  selector: 'app-delivery-type',
  imports: [],
  templateUrl: './delivery-type.component.html',
})
export class DeliveryTypeComponent {

  deliveryTypes = [
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
  selectedDeliveryType: Signal<string>;

  constructor(public DeliveryType: DeliveryType) {
    this.selectedDeliveryType = toSignal(
      this.DeliveryType.selectedDeliveyType,
      { initialValue: '' }
    );
  }

  deliveryTypeSelectHandler(ingredient: string) {
    this.DeliveryType.toggleDeliverType(ingredient);
  }

  isSelected(ingredient: string): boolean {
    return this.selectedDeliveryType()===(ingredient);
  }
}
