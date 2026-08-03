import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipeApiResponse } from '../../models/recipe.model';


@Injectable({ providedIn: 'root' })
export class RecipeService {

  constructor(private http: HttpClient) {}

  getRecipes(skip?:number): Observable<RecipeApiResponse> {
    return this.http.get<RecipeApiResponse>(
      `https://dummyjson.com/recipes?limit=5&skip=${skip}&select=name,image`
    )
  }
  getSingleRecipe(id:string):Observable<Recipe>{
    return this.http.get<Recipe>(
      `https://dummyjson.com/recipes/${id}`
    )
  }
}