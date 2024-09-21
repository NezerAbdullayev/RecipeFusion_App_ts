import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CocktailResponse } from "./types/apiTypes";

const coctailApi = createApi({
    reducerPath: "cocktailApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/" }),
    tagTypes: ["Cocktail"],
    endpoints: (builder) => ({
        // cocktail category list
        getCoctailList: builder.query({
            query: () => "list.php?c=list",
        }),

        // coctails category list
        getCoctailProducts: builder.query<CocktailResponse, void>({
            query: () => "search.php?s=",
            keepUnusedDataFor: 60,
        }),

        getCocktailCategoryList: builder.query<{ strCategory: string }, void>({
            query: () => "list.php?c=list",
        }),

        getCocktailIngredients: builder.query<{ strCategory: string[] }, void>({
            query: () => "list.php?i=list",
        }),
    }),
});

export const { useGetCoctailListQuery, useGetCoctailProductsQuery, useGetCocktailCategoryListQuery, useGetCocktailIngredientsQuery } =
    coctailApi;

export default coctailApi;
