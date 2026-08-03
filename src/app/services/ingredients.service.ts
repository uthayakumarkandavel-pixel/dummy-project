import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private selectedIngredientsSubject = new BehaviorSubject<string[]>([]);

  selectedIngredients$ = this.selectedIngredientsSubject.asObservable();

  toggleIngredient=(ingredient: string)=> {
    const selected = this.selectedIngredientsSubject.getValue();

    if (selected.includes(ingredient))
      this.selectedIngredientsSubject.next(
        selected.filter(i => i !== ingredient)
      );
    else {
      this.selectedIngredientsSubject.next([
        ...selected,
        ingredient
      ]);
    }
  }

  reset = (ingredient: string[]) => this.selectedIngredientsSubject.next(ingredient);
}