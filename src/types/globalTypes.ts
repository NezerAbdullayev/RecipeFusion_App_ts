// meals
export interface MealProduct {
    idMeal: string;
    strCategory: string;
    strMealThumb: string;
}

export interface MealProductsResponse {
    meals?: MealProduct[];
}

// ! cocktail interface

// cocktails product
export interface CocktailProduct {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}
export interface CocktailProductsProps {
    drinks?: CocktailProduct[];
}

// cocktail category
export interface CocktailCategory {
    strCategory: string;
}
export interface CocktailCategoryResponse {
    drinks: CocktailCategory[];
}

// cocktail ingredient
export interface CocktailIngredients {
    strIngredient1: string;
}
export interface CocktailIngredientsResponse {
    drinks: CocktailIngredients[];
}

// cocktail Alcoholic
export interface CocktailAlcoholic {
    strAlcoholic: string;
}
export interface CocktailAlcoholicResponse {
    drinks: CocktailAlcoholic[];
}
