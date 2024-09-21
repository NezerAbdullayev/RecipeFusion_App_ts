import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MealsResponse, MealCategoryResponse, MealAreaResponse, MealIngredientsResponse, MealCategory } from "./types/apiTypes";

// API konfiqurasiya
const mealApi = createApi({
    reducerPath: "mealApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://www.themealdb.com/api/json/v1/1/" }),
    tagTypes: ["Meal"],
    endpoints: (builder) => ({
        //  get meals filters list
        getMealCategoryList: builder.query<MealCategoryResponse, void>({
            query: () => "list.php?c=list",
        }),

        getMealAreaList: builder.query<MealAreaResponse, void>({
            query: () => "list.php?a=list",
        }),

        getMealIngredientsList: builder.query<MealIngredientsResponse, void>({
            query: () => "list.php?i=list",
        }),

        // get meal products
        getMealProductByCategory: builder.query<MealsResponse, { categories: string[] }>({
            queryFn: async ({ categories }) => {
                try {
                    const responses = await Promise.all(
                        categories?.map((category) =>
                            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then((res) => res.json()),
                        ),
                    );
                    const meals = responses.flatMap((response) => response.meals).reverse();
                    return { data: meals };
                } catch (error) {
                    return { error: "Failed to fetch" } as FetchBaseQueryError;
                }
            },
        }),

        getMealProductByArea: builder.query<MealsResponse, { searchItem: string[] }>({
            queryFn: async ({ searchItem }) => {
                try {
                    const responses = await Promise.all(
                        searchItem.map((area) =>
                            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`).then((res) => res.json()),
                        ),
                    );
                    const meals = responses.flatMap((response) => response.meals).reverse();
                    return { data: { meals }, error: "" };
                } catch (error) {
                    return { error: "Failed to fetch" } as FetchBaseQueryError;
                }
            },
        }),

        getMealProductByIngredient: builder.query<MealsResponse, { searchItem: string[] }>({
            queryFn: async ({ searchItem }) => {
                try {
                    const responses = await Promise.all(
                        searchItem.map((ingredient) =>
                            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((res) => res.json()),
                        ),
                    );
                    const meals = responses.flatMap((response) => response.meals).reverse();
                    return { data: { meals }, error: "" };
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
    }),
});

export const {
    useGetMealCategoryListQuery,
    useGetMealAreaListQuery,
    useGetMealIngredientsListQuery,

    useGetMealProductByCategoryQuery,
    useLazyGetMealProductByAreaQuery,
    useLazyGetMealProductByIngredientQuery,

    useGetDetailsByIdQuery,
    useLazyGetMealRandomMealQuery,
} = mealApi;

export default mealApi;
