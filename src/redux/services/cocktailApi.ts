import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { CocktailResponse } from "./types/apiTypes";
import {
    CocktailAlcoholicResponse,
    CocktailCategoryResponse,
    CocktailIngredientsResponse,
    CocktailProduct,
    CocktailProductsProps,
} from "../../types/globalTypes";

const coctailApi = createApi({
    reducerPath: "cocktailApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/" }),
    tagTypes: ["Cocktail"],
    endpoints: (builder) => ({
        // cocktail filters list
        getCocktailCategoryList: builder.query<CocktailCategoryResponse, void>({
            query: () => "list.php?c=list",
        }),

        getCocktailIngredientList: builder.query<CocktailIngredientsResponse, void>({
            query: () => "list.php?i=list",
        }),

        getCocktailAlcoholicList: builder.query<CocktailAlcoholicResponse, void>({
            query: () => "list.php?a=list",
        }),

        // ? get cocktail products
        getCocktailProductByCategory: builder.query<CocktailProductsProps, { categories: string[] }>({
            async queryFn({ categories }) {
                try {
                    const responses = await Promise.all(
                        categories?.map((category) =>
                            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`).then((res) => res.json()),
                        ),
                    );

                    const cocktail = responses.flatMap((response) => response.drinks)?.reverse();
                    return { data: cocktail as CocktailProductsProps };
                } catch (error) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    return { error: { status: "FETCH_ERROR", error: message } };
                }
            },
        }),

        getCocktailProductByIngredient:builder.query<CocktailProductsProps,{ingredients:string[]}>({
            async queryFn({ingredients}){
                try {
                    const responses = await Promise.all(
                        ingredients?.map((ingredient) =>
                            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${ingredient}`).then((res) => res.json()),
                        ),
                    );

                    const cocktail = responses.flatMap((response) => response.drinks)?.reverse();
                    return { data: cocktail as CocktailProductsProps };
                } catch (error) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    return { error: { status: "FETCH_ERROR", error: message } };
                }
            }
        }),

        // getCocktailIngredients: builder.query<{ strCategory: string[] }, void>({
        //     query: () => "list.php?i=list",
        // }),

        getCocktailProductByName: builder.query<CocktailProductsProps, { searchItem: string }>({
            query: ({ searchItem }) => `search.php?s=${searchItem}`,
        }),
    }),
});

export const {
    useGetCocktailCategoryListQuery,
    useGetCocktailIngredientListQuery,
    useGetCocktailAlcoholicListQuery,

    useGetCocktailProductByCategoryQuery,
    useLazyGetCocktailProductByIngredientQuery,

    useLazyGetCocktailProductByNameQuery,
} = coctailApi;

export default coctailApi;
