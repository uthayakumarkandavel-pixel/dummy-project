import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipeApiResponse } from '../../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private http: HttpClient) {}
  getRecipes(): Observable<RecipeApiResponse> {
    return this.http.get<RecipeApiResponse>('https://dummyjson.com/recipes')
  }
  getSingleRecipe(id:string):Observable<Recipe>{
    return this.http.get<Recipe>(`https://dummyjson.com/recipes/${id}`)
  }
}