import React, { useCallback, useEffect, useState } from "react";
import { Alert, Spin } from "antd";

import Pagination from "../pagination/Pagination";
import CocktailSellect from "../sellected/CocktailSellect";
import {
    useGetCocktailProductByCategoryQuery,
    useLazyGetCocktailProductByAlcoholicQuery,
    useLazyGetCocktailProductByIngredientQuery,
} from "../../redux/services/cocktailApi";
import { CocktailProduct } from "../../types/globalTypes";

const CocktailList: React.FC = () => {
    const [cocktalCategoryList, setCocktailCategoryList] = useState<string[]>(["Cocktail"]);
    const [cocktailIngredientList, setCocktailIngredientList] = useState<string[]>([]);
    const [coctailAlcoholicList, setCoctailAlcoholic] = useState<string[]>([]);

    // product data
    const [coctailData, setCoctailData] = useState<CocktailProduct[] | []>([]);

    // API
    // category
    const {
        data: categoryData,
        error: categoryError,
        isLoading: categoryLoading,
    } = useGetCocktailProductByCategoryQuery({ categories: cocktalCategoryList });

    // ingredient
    const [GetCocktailProductByIngredient, { data: fetchedIngredietData, error: ingredientError, isLoading: ingredientLoading }] =
        useLazyGetCocktailProductByIngredientQuery();

    // alcoholic
    const [GetCocktailProductByAlcoholic, { data: fetchedAlcoholicData, error: alcoholicError, isLoading: alcoholicLoading }] =
        useLazyGetCocktailProductByAlcoholicQuery();

    //TODO all useEffects
    useEffect(() => {
        if (cocktailIngredientList?.length > 0) GetCocktailProductByIngredient({ ingredients: cocktailIngredientList });
    }, [cocktailIngredientList]);

    useEffect(() => {
        if (coctailAlcoholicList?.length > 0) GetCocktailProductByAlcoholic({ selectedItems: coctailAlcoholicList });
    }, [coctailAlcoholicList]);

    // local filtered data
    useEffect(() => {
        if (!categoryData || (!fetchedIngredietData && !fetchedAlcoholicData)) {
            setCoctailData(categoryData || []);
            return;
        }

        const categoryCocktailIds = new Set(categoryData?.map((product) => product.idDrink));

        if (fetchedAlcoholicData && coctailAlcoholicList?.length > 0 && fetchedIngredietData && cocktailIngredientList?.length > 0) {
            const ingredientCocktailIds = new Set(fetchedIngredietData?.map((item) => item.idDrink));

            const commonCocktailIds = [...categoryCocktailIds].filter((id) => ingredientCocktailIds.has(id));

            const filteredCocktail = fetchedAlcoholicData?.filter((item) => commonCocktailIds.includes(item.idDrink));

            setCoctailData(filteredCocktail || []);
        } else if (fetchedAlcoholicData && coctailAlcoholicList?.length > 0) {
            const updatedCocktail = fetchedAlcoholicData?.filter((item) => categoryCocktailIds.has(item.idDrink));

            setCoctailData(updatedCocktail);
        } else if (fetchedIngredietData && cocktailIngredientList?.length > 0) {
            const updatedMeals = fetchedIngredietData?.filter((item) => categoryCocktailIds.has(item.idDrink));

            setCoctailData(updatedMeals);
        } else {
            setCoctailData(categoryData);
        }
    }, [fetchedIngredietData, fetchedAlcoholicData, categoryData, cocktailIngredientList, coctailAlcoholicList]);

    // ? handle functions
    // category
    const handleCocktailCategoryList = useCallback((newCategory: string[]) => {
        setCocktailCategoryList(newCategory.includes("Cocktail") ? newCategory : ["Cocktail", ...newCategory]);
    }, []);

    // Alcoholic
    const handleCocktailAlcoholicList = useCallback((drink: string[]) => {
        setCoctailAlcoholic(drink);
    }, []);

    //Ingredient

    const handleCocktailIngredientList = useCallback((ingredient: string[]) => {
        setCocktailIngredientList(ingredient);
    }, []);

    if (categoryLoading || ingredientLoading || alcoholicLoading) return <Spin />;

    if (categoryError || ingredientError || alcoholicError)
        return <Alert message="Error" description="An error occurred while fetching the coctails." type="error" />;

    return (
        <>
            <CocktailSellect
                onCocktailCategoryList={handleCocktailCategoryList}
                onCocktailAlcoholicList={handleCocktailAlcoholicList}
                onCocktailIngredientList={handleCocktailIngredientList}
                cocktalCategoryList={cocktalCategoryList}
                cocktailIngredientList={cocktailIngredientList}
                coctailAlcoholicList={coctailAlcoholicList}
            />

            <Pagination data={coctailData} />
        </>
    );
};

export default CocktailList;
