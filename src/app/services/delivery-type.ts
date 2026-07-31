import { Service } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Service()
export class DeliveryType {
    private deliveryTypeSubject = new BehaviorSubject<string>('');

    selectedDeliveyType = this.deliveryTypeSubject.asObservable();

    toggleDeliverType(deliveryType: string) {
        this.deliveryTypeSubject.next(deliveryType);
    }

    reset(type:string) {
        this.deliveryTypeSubject.next(type);
    }

}
