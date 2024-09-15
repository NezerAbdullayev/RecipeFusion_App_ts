// meal
export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
}

export interface MealsResponse {
    meals?: Meal[];
}

export interface MealCategory {
    strCategory: string;
}

export interface MealCategoryResponse {
    meals: MealCategory[];
}

export interface MealArea {
    strArea: string;
}

export interface MealAreaResponse {
    meals: MealArea[];
}

export interface MealIngredientsResponse {
    meals: { strIngredient: string }[];
}

// /////////////

