import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    MealsResponse,
    MealCategoryResponse,
    MealAreaResponse,
    MealIngredientsResponse,
    MealCategory,
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
        }),

        getMealFilterData: builder.query<MealsResponse, void>({
            query: () => "filter.php?c",
        }),

        getAllMealCategory: builder.query<MealCategoryResponse, void>({
            query: () => "categories.php",
        }),

        getDetailsById: builder.query<MealsResponse, { id: string }>({
            query: ({id}) => `lookup.php?i=${id}`,
        }),

        // meal catehgorys
        getMealCategorys: builder.query<MealsResponse, { category: string }>({
            query: ({ category }) => `filter.php?c=${category}&limit=10`,
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

        getMealRandomMeal: builder.query<MealCategoryResponse, void>({
            query: () => "random.php",
        }),

        getMealProductByName: builder.query<MealsResponse, { searchItem: string }>({
            query: ({ searchItem }) => `search.php?s=${searchItem}`,
        }),

        getMealProdcutByCategory: builder.query<MealsResponse, { searchItem: string }>({
            query: ({ searchItem }) => `search.php?c=${searchItem}`,
        }),

        getMealProductByArea: builder.query<MealsResponse, { searchItem: string }>({
            query: ({ searchItem }) => `filter.php?a=${searchItem}`,
        }),

        getMealProductByIngredient: builder.query<MealsResponse, { searchItem: string }>({
            query: ({ searchItem }) => `filter.php?i=${searchItem}`,
        }),
    }),
});

export const {
    useGetMealProductsQuery,
    useGetDetailsByIdQuery,
    useGetMealCategoryListQuery,
    useGetMealIngredientsQuery,
    useGetMealAreaListQuery,
    useGetMealFilterDataQuery,
    useGetAllMealCategoryQuery,
    useLazyGetMealCategorysQuery,
    useLazyGetMealRandomMealQuery,
} = mealApi;

export default mealApi;
