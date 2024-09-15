import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    MealsResponse,
    MealCategoryResponse,
    MealAreaResponse,
    MealIngredientsResponse,
} from "./types/apiTypes";

// API konfiqurasiya
const mealApi = createApi({
    reducerPath: "mealApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://www.themealdb.com/api/json/v1/1/" }),
    tagTypes: ["Meal"],
    endpoints: (builder) => ({
        //  meal products
        getMealProducts: builder.query<MealsResponse, void>({
            query: () => "search.php?s=",
            keepUnusedDataFor: 300,
        }),

        // meal category listi
        getMealCategoryList: builder.query<MealCategoryResponse, void>({
            query: () => "list.php?c=list",
        }),

        // meal region listi
        getMealAreaList: builder.query<MealAreaResponse, void>({
            query: () => "list.php?a=list",
        }),

        // meal ingredients listi
        getMealIngredients: builder.query<MealIngredientsResponse, void>({
            query: () => "list.php?i=list",
        }),
    }),
});

export const {
    useGetMealProductsQuery,
    useGetMealCategoryListQuery,
    useGetMealIngredientsQuery,
    useGetMealAreaListQuery,
} = mealApi;

export default mealApi;
