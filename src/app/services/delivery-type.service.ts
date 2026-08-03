import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})export class DeliveryTypeService {
    private deliveryTypeSubject = new BehaviorSubject<string>('');

    selectedDeliveryType = this.deliveryTypeSubject.asObservable();

    toggleDeliveryType(deliveryType: string) {
        this.deliveryTypeSubject.next(deliveryType);
    }

    reset(type:string) {
        this.deliveryTypeSubject.next(type);
    }

}
