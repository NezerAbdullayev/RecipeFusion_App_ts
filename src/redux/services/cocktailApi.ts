import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    CocktailAlcoholicResponse,
    CocktailCategoryResponse,
    CocktailIngredientsResponse,
    CocktailProduct,
    CocktailProductsProps,
} from "../../types/globalTypes";

const cache: { [key: string]: { drinks: CocktailProduct[] } } = {};
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
                const cocktails: CocktailProduct[] = [];

                for (const category of categories) {
                    if (cache[category]) {
                        cocktails.push(...cache[category].drinks);
                    } else {
                        try {
                            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
                            const data = await response.json();
                            const drinks = data.drinks || [];
                            cocktails.push(...drinks);

                            // Cache the results
                            cache[category] = { drinks };
                        } catch (error) {
                            const message = error instanceof Error ? error.message : "Unknown error";
                            return { error: { status: "FETCH_ERROR", error: message } };
                        }
                    }
                }

                return { data: cocktails.reverse() };
            },
        }),

        getCocktailProductByIngredient: builder.query<CocktailProduct[], { ingredients: string[] }>({
            async queryFn({ ingredients }) {
                const cocktails: CocktailProduct[] = [];

                for (const ingredient of ingredients) {
                    if (cache[ingredient]) {
                        cocktails.push(...cache[ingredient].drinks);
                    } else {
                        try {
                            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
                            const data = await response.json();
                            const drinks = data.drinks || [];
                            cocktails.push(...drinks);

                            // Cache the results
                            cache[ingredient] = { drinks };
                        } catch (error) {
                            const message = error instanceof Error ? error.message : "Unknown error";
                            return { error: { status: "FETCH_ERROR", error: message } };
                        }
                    }
                }

                return { data: cocktails.reverse() };
            },
        }),

        getCocktailProductByAlcoholic: builder.query<CocktailProduct[], { selectedItems: string[] }>({
            async queryFn({ selectedItems }) {
                const cocktails: CocktailProduct[] = [];

                for (const item of selectedItems) {
                    if (cache[item]) {
                        cocktails.push(...cache[item].drinks);
                    } else {
                        try {
                            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${item}`);
                            const data = await response.json();
                            const drinks = data.drinks || [];
                            cocktails.push(...drinks);

                            // Cache the results
                            cache[item] = { drinks };
                        } catch (error) {
                            const message = error instanceof Error ? error.message : "Unknown error";
                            return { error: { status: "FETCH_ERROR", error: message } };
                        }
                    }
                }

                return { data: cocktails.reverse() };
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
