import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService  {
    recipesChanged = new Subject<Recipe[]>();


    // private recipes: Recipe[] = [
    //     new Recipe('The Best Chicken Marinade Recipe', 'This extra juicy and flavorful. This savory marinade makes grilled chicken mouthwatering!',

    //     'https://healthcare.utah.edu/healthfeed/postings/2020/images/baked-chicken.jpg',
    //     [
    //         new Ingredient('Meat', 1),
    //         new Ingredient( 'Cheese' , 2)
    //     ]),
    //     new Recipe('Gourmet Taco Recipes ', "Yummy Tacos", 'https://prods3.imgix.net/images/articles/2017_07/nonfeatured-make-buy-taco-seasoning.jpg',
    //     [
    //         new Ingredient('Meat', 2),
    //         new Ingredient( 'Tortilla' , 4)
    //     ])
    // ];
    private recipes:Recipe[] = [];

    constructor(private slService: ShoppingListService){}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);

    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
