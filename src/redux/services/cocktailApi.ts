import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
        getCocktailProductByCategory: builder.query<CocktailProduct[], { categories: string[] }>({
            async queryFn({ categories }) {
                try {
                    const responses = await Promise.all(
                        categories?.map((category) =>
                            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`).then((res) => res.json()),
                        ),
                    );

                    const cocktail = responses.flatMap((response) => response.drinks)?.reverse();

                    return { data: cocktail as CocktailProduct[] };
                } catch (error) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    return { error: { status: "FETCH_ERROR", error: message } };
                }
            },
        }),

        getCocktailProductByIngredient: builder.query<CocktailProduct[], { ingredients: string[] }>({
            async queryFn({ ingredients }) {
                try {
                    const responses = await Promise.all(
                        ingredients?.map((ingredient) =>
                            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`).then((res) => res.json()),
                        ),
                    );

                    const cocktail = responses.flatMap((response) => response.drinks)?.reverse();
                    return { data: cocktail as CocktailProduct[] };
                } catch (error) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    return { error: { status: "FETCH_ERROR", error: message } };
                }
            },
        }),

        getCocktailProductByAlcoholic: builder.query<CocktailProduct[], { sellectedItems: string[] }>({
            async queryFn({ sellectedItems }) {
                try {
                    const responses = await Promise.all(
                        sellectedItems?.map((Item) =>
                            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${Item}`).then((res) => res.json()),
                        ),
                    );

                    const cocktail = responses.flatMap((response) => response.drinks)?.reverse();
                    return { data: cocktail as CocktailProduct[] };
                } catch (error) {
                    const message = error instanceof Error ? error.message : "Unknown error";
                    return { error: { status: "FETCH_ERROR", error: message } };
                }
            },
        }),

        getCocktailProductByName: builder.query<CocktailProductsProps, { searchItem: string }>({
            query: ({ searchItem }) => `search.php?s=${searchItem}`,
        }),

        getCocktailRandomProduct: builder.query<CocktailProductsProps, void>({
            query: () => "random.php",
        }),
        getCocktailProductDetailsById: builder.query<CocktailProductsProps, { id?: string }>({
            query: ({ id }) => `lookup.php?i=${id}`,
        }),
    }),
});

export const {
    useGetCocktailCategoryListQuery,
    useGetCocktailIngredientListQuery,
    useGetCocktailAlcoholicListQuery,

    useGetCocktailProductByCategoryQuery,
    useLazyGetCocktailProductByIngredientQuery,
    useLazyGetCocktailProductByAlcoholicQuery,

    useLazyGetCocktailProductByNameQuery,
    useLazyGetCocktailRandomProductQuery,
    useGetCocktailProductDetailsByIdQuery,
} = coctailApi;

export default coctailApi;
