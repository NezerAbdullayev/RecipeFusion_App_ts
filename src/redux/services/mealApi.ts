import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
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

        // meal category listi
        getMealCategoryList: builder.query<MealCategoryResponse, void>({
            query: () => "list.php?c=list",
        }),

        // meal region listi
        getMealAreaList: builder.query<MealAreaResponse, void>({
            query: () => "list.php?a=list",
        }),

        // meal ingredients listi
        getMealIngredientsList: builder.query<MealIngredientsResponse, void>({
            query: () => "list.php?i=list",
        }),
        //////

        getAllMealCategory: builder.query<MealCategoryResponse, void>({
            query: () => "categories.php",
        }),

        // meal catehgorys
        getMealCategorys: builder.query<MealsResponse, { categories: string[] | [] }>({
            queryFn: async ({ categories }) => {
                try {
                    const responses = await Promise.all(
                        categories?.map((category) =>
                            fetch(
                                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
                            ).then((res) => res.json()),
                        ),
                    );
                    const meals = responses.flatMap((response) => response.meals).reverse();
                    return { data: meals };
                } catch (error) {
                    return { error: "Failed to fetch" } as FetchBaseQueryError;
                }
            },
        }),

        getDetailsById: builder.query<MealsResponse, { id: string }>({
            query: ({ id }) => `lookup.php?i=${id}`,
        }),

        getMealRandomMeal: builder.query<MealCategoryResponse, void>({
            query: () => "random.php",
        }),

        getMealProductByName: builder.query<MealsResponse, { searchItem: string }>({
            query: ({ searchItem }) => `search.php?s=${searchItem}`,
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

    useGetMealCategoryListQuery,
    useGetMealAreaListQuery,
    useGetMealIngredientsListQuery,

    useGetAllMealCategoryQuery,
    useGetMealCategorysQuery,

    useGetDetailsByIdQuery,
    useLazyGetMealRandomMealQuery,

    useLazyGetMealProductByAreaQuery

} = mealApi;

export default mealApi;
