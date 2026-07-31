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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit,DoCheck{
  recipe = signal<Recipe | null>(null);
  loader = signal(false);

  showIngredients = signal(true);
  showInstructions = signal(true);

  private recipeService = inject(RecipeService);
  private activateRoute = inject(ActivatedRoute);

  id = this.activateRoute.snapshot.paramMap.get('id') || "";

  ngOnInit(): void {
    this.loader.set(true);
    this.getRecipe();
  }
  ngDoCheck() {
    console.log("Recipie checked");
  }
  getRecipe(): void {
    this.recipeService.getSingleRecipe(this.id)
      .pipe(map(res => res))
      .subscribe(res => {
        this.loader.set(false);
        this.recipe.set(res);
      });
  }

onButtonClick(): void {
  const current = this.recipe();
  if (!current) return;
  this.recipe.set({
    ...current,
    ingredients: []
  } as Recipe);
}
}