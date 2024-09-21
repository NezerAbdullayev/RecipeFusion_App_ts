// meals
export  interface MealProduct{
    idMeal: string;
    strCategory: string;
    strMealThumb: string;
}

export interface MealProductsProps{
    meals?:MealProduct[]
}

// cocktails


export  interface CocktailProduct{
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
}

export interface CocktailProductsProps{
    drinks?:CocktailProduct[]
}