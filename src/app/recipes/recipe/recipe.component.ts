import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipeService } from '../../services/recipe';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../models/recipe.model';
import { Loader } from '../../common/loader/loader';

@Component({
  selector: 'app-recipe.component',
  imports: [Loader],
  templateUrl: './recipe.component.html',
})

export class RecipeComponent implements OnInit {
  recipe = signal<Recipe | null>(null);
  loader=signal(false);
  private recipeService = inject(RecipeService);
  private activateRoute =inject(ActivatedRoute);
  id =this.activateRoute.snapshot.paramMap.get('id')||"";

  ngOnInit(): void {
    this.loader.set(true);
    this.getRecipe();
  }

   getRecipe(): void {
      this.recipeService.getSingleRecipe(this.id).pipe(
        map(res => res)
      ).subscribe(res => {
          this.loader.set(false);
          this.recipe.set(res);
          console.log(this.recipe());
          console.log(this.loader());
        });
    }
}

