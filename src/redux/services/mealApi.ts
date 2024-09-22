import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MealsResponse, MealCategoryResponse, MealAreaResponse, MealIngredientsResponse } from "./types/apiTypes";
import { MealProductsResponse } from "../../types/globalTypes";

// API konfiqurasiya
const cache: { [key: string]: { meals: any[] } } = {};
const mealApi = createApi({
    reducerPath: "mealApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://www.themealdb.com/api/json/v1/1/" }),
    tagTypes: ["Meal"],
    endpoints: (builder) => ({
        // Get meals filters list
        getMealCategoryList: builder.query<MealCategoryResponse, void>({
            query: () => "list.php?c=list",
        }),

        getMealAreaList: builder.query<MealAreaResponse, void>({
            query: () => "list.php?a=list",
        }),

        getMealIngredientsList: builder.query<MealIngredientsResponse, void>({
            query: () => "list.php?i=list",
        }),

        // Get meal products by category
        getMealProductByCategory: builder.query<MealProductsResponse, { categories: string[] }>({
            async queryFn({ categories }) {
                const uniqueCategories = Array.from(new Set(categories));
                const meals = [];

                // check cache
                for (const category of uniqueCategories) {
                    if (cache[category]) {
                        meals.push(...cache[category].meals);
                    } else {
                        try {
                            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                            const data = await response.json();
                            const categoryMeals = data.meals || [];
                            meals.push(...categoryMeals);

                            cache[category] = { meals: categoryMeals };
                        } catch (error) {
                            return {
                                error: {
                                    status: 500,
                                    statusText: "Failed to fetch",
                                    data: undefined,
                                } as FetchBaseQueryError,
                            };
                        }
                    }
                }

                return { data: { meals: meals.reverse() } as MealProductsResponse };
            },
        }),

        getMealProductByArea: builder.query<MealProductsResponse, { searchItem: string[] }>({
            async queryFn({ searchItem }) {
                const uniqueAreas = Array.from(new Set(searchItem));
                const meals = [];

                for (const area of uniqueAreas) {
                    if (cache[area]) {
                        meals.push(...cache[area].meals);
                    } else {
                        try {
                            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
                            const data = await response.json();
                            const areaMeals = data.meals || [];
                            meals.push(...areaMeals);

                            // add to cache
                            cache[area] = { meals: areaMeals };
                        } catch (error) {
                            return {
                                error: {
                                    status: 500,
                                    statusText: "Failed to fetch",
                                    data: undefined,
                                } as FetchBaseQueryError,
                            };
                        }
                    }
                }

                return { data: { meals: meals.reverse() } as MealProductsResponse };
            },
        }),

        getMealProductByIngredient: builder.query<MealProductsResponse, { searchItem: string[] }>({
            async queryFn({ searchItem }) {
                const uniqueIngredients = Array.from(new Set(searchItem));
                const meals = [];

                for (const ingredient of uniqueIngredients) {
                    if (cache[ingredient]) {
                        meals.push(...cache[ingredient].meals);
                    } else {
                        try {
                            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
                            const data = await response.json();
                            const ingredientMeals = data.meals || [];
                            meals.push(...ingredientMeals);

                            cache[ingredient] = { meals: ingredientMeals };
                        } catch (error) {
                            return {
                                error: {
                                    status: 500,
                                    statusText: "Failed to fetch",
                                    data: undefined,
                                } as FetchBaseQueryError,
                            };
                        }
                    }
                }

                return { data: { meals: meals.reverse() } as MealProductsResponse };
            },
        }),

        getDetailsById: builder.query<MealsResponse, { id?: string }>({
            query: ({ id }) => `lookup.php?i=${id}`,
        }),

        getMealRandomMeal: builder.query<MealsResponse, void>({
            query: () => "random.php",
        }),

        getMealProductByName: builder.query<MealProductsResponse, { searchItem: string }>({
            query: ({ searchItem }) => `search.php?s=${searchItem}`,
        }),
    }),
});

// Exported hooks
export const {
    useGetMealCategoryListQuery,
    useGetMealAreaListQuery,
    useGetMealIngredientsListQuery,

    useGetMealProductByCategoryQuery,
    useLazyGetMealProductByAreaQuery,
    useLazyGetMealProductByIngredientQuery,

    useGetDetailsByIdQuery,
    useLazyGetMealRandomMealQuery,
    useLazyGetMealProductByNameQuery,
} = mealApi;

export default mealApi;
