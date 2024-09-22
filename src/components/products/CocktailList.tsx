import React, { useCallback, useEffect, useState } from "react";
import { Alert, Spin } from "antd";

import Pagination from "../pagination/Pagination";
import CocktailSellect from "../sellected/CocktailSellect";
import { useGetCocktailProductByCategoryQuery, useLazyGetCocktailProductByIngredientQuery } from "../../redux/services/cocktailApi";
import { CocktailProductsProps } from "../../types/globalTypes";

const CocktailList: React.FC = () => {
    const [cocktalCategoryList, setCocktailCategoryList] = useState<string[]>(["Cocktail"]);
    const [cocktailIngredientList, setCocktailIngredientList] = useState<string[]>([]);
    const [coctailAlcoholicList, setCoctailAlcoholic] = useState<string[]>([]);

    const [coctailData, setCoctailData] = useState<CocktailProductsProps | []>([]);

    // API
    const {
        data: categoryData,
        error: categoryError,
        isLoading: categoryLoading,
    } = useGetCocktailProductByCategoryQuery({ categories: cocktalCategoryList });


    const [GetCocktailProductByIngredient,{data:fetchedIngredietData,error:ingredientError}]=useLazyGetCocktailProductByIngredientQuery()

    useEffect(() => {
        setCoctailData(categoryData || []);
    }, [categoryData]);



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


    if (categoryLoading) return <Spin />;

    if (categoryError) return <Alert message="Error" description="An error occurred while fetching the coctails." type="error" />;

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
