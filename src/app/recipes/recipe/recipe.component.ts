import { ChangeDetectionStrategy, Component, DoCheck, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { Recipe } from '../../../models/recipe.model';
import { Breadcrumbs } from '../../common/breadcrumbs/breadcrumbs';
import { RecipeService } from '../../services/recipe';
import { Loader } from '../../common/loader/loader';
import { IngredientComponent } from './ingredient/ingredient.component';
import { InstructionComponent } from './instruction/instruction.component';

@Component({
  selector: 'app-recipe.component',
  standalone: true,
  imports: [Loader, Breadcrumbs, IngredientComponent, InstructionComponent],
  templateUrl: './recipe.component.html',
  changeDetection:ChangeDetectionStrategy.Default
})
export class RecipeComponent implements OnInit,DoCheck {
  recipe = signal<Recipe | null>(null);
  loader = signal(false);
  title='';
  count=0;

  showIngredients = signal(true);
  showInstructions = signal(true);
onButtonClick(){
  alert('Recipe Clicked')
}
  private recipeService = inject(RecipeService);
  private activateRoute = inject(ActivatedRoute);

  id = this.activateRoute.snapshot.paramMap.get('id') || "";

  ngOnInit(): void {
    this.loader.set(true);
    this.getRecipe();
  }

  ngDoCheck(): void {
    this.title='Title'+this.count
    this.count++;
    console.log('Do Check triggers Recipe');
  }

  getRecipe(): void {
    this.recipeService.getSingleRecipe(this.id)
      .pipe(map(res => res))
      .subscribe(res => {
        this.loader.set(false);
        this.recipe.set(res);
      });
  }

}