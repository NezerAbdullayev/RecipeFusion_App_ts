import React, { useEffect, useState } from "react";
import { Alert, Spin } from "antd";
import {
    useGetMealProductByCategoryQuery,
    useLazyGetMealProductByAreaQuery,
    useLazyGetMealProductByIngredientQuery,
} from "../../redux/services/mealApi";
import MealSellect from "../sellected/MealSellect";
import Pagination from "../pagination/Pagination";

import { MealProduct } from "../../types/globalTypes";

const MealList: React.FC = () => {
    // filter states
    const [mealCategorys, setMealCategorys] = useState<string[]>(["Beef"]);
    const [mealAreasFilter, setMealAreasFilter] = useState<string[]>([]);
    const [mealIngredientFilter, setMealIngredientFilter] = useState<string[]>([]);

    // product data
    const [mealData, setMealData] = useState<MealProduct[]>([]);

    // rtk query hooks
    const { data: categoryData, error:categoryError, isLoading:categoryLoading } = useGetMealProductByCategoryQuery({ categories: mealCategorys });

    const [getMealProductByArea, { data: fetchedAreaMealData, error: areaError, isLoading: areaLoading }] =
        useLazyGetMealProductByAreaQuery();

    const [getMealProductByIngredient, { data: fetchedIngredientMealData, error: ingredientError, isLoading: ingredientLoading }] =
        useLazyGetMealProductByIngredientQuery();


    //TODO all useEffects
    // get area effect
    useEffect(() => {
        if (mealAreasFilter.length > 0) getMealProductByArea({ searchItem: mealAreasFilter });
    }, [mealAreasFilter]);

    // get ingredient effect
    useEffect(() => {
        if (mealIngredientFilter?.length > 0) getMealProductByIngredient({ searchItem: mealIngredientFilter });
    }, [mealIngredientFilter]);

    // local filtered data
    useEffect(() => {
        if (!categoryData || (!fetchedAreaMealData && !fetchedIngredientMealData)) {
            setMealData(categoryData?.meals || []);
            return;
        }

        // Create a set of meal IDs from the category data for quick lookup
        const categoryMealIds = new Set(categoryData?.meals?.map((product) => product.idMeal));

        if (fetchedAreaMealData && mealAreasFilter?.length > 0 && fetchedIngredientMealData && mealIngredientFilter?.length > 0) {
            const ingredientMealIds = new Set(fetchedIngredientMealData?.meals?.map((item) => item.idMeal));

            const commonMealIds = [...categoryMealIds].filter((id) => ingredientMealIds.has(id));

            const filteredMeals = fetchedAreaMealData?.meals?.filter((item) => commonMealIds.includes(item.idMeal));

            setMealData(filteredMeals || []);
        } else if (fetchedAreaMealData && mealAreasFilter?.length > 0) {
            const updatedMeals = fetchedAreaMealData?.meals?.filter((item) => categoryMealIds.has(item.idMeal));

            setMealData(updatedMeals as MealProduct[]);
        } else if (fetchedIngredientMealData && mealIngredientFilter?.length > 0) {
            const updatedMeals = fetchedIngredientMealData?.meals?.filter((item) => categoryMealIds.has(item.idMeal));

            setMealData(updatedMeals as MealProduct[]);
        } else {
            setMealData(categoryData?.meals as MealProduct[]);
        }
    }, [fetchedAreaMealData, fetchedIngredientMealData, categoryData, mealAreasFilter, mealIngredientFilter]);

    // ? handle functions
    // category
    const handleMealCategoryList = (newData: string[]) => {
        // debugger;
        setMealCategorys(newData?.includes("Beef") ? newData : ["Beef", ...newData]);
    };

    // area
    const handleMealAreasList = (area: string[]) => {
        setMealAreasFilter(area);
    };

    //Ingredient

    const handleMealIngredientList = (ingredient: string[]) => {
        setMealIngredientFilter(ingredient);
    };

    if (categoryLoading || areaLoading || ingredientLoading) return <Spin />;

    if (categoryError || areaError || ingredientError)
        return <Alert message="Error" description="An error occurred while fetching the meals." type="error" />;

    return (
        <>
            <MealSellect
                onMealCategoryList={handleMealCategoryList}
                mealCategorys={mealCategorys}
                onMealFilterList={handleMealAreasList}
                mealAreasFilter={mealAreasFilter}
                onMealIngredientList={handleMealIngredientList}
                mealIngredientFilter={mealIngredientFilter}
            />

            <Pagination data={mealData} />
        </>
    );
};

export default MealList;
