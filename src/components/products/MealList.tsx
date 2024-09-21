import React, { useEffect, useState } from "react";
import { Alert, Spin } from "antd";
import {
    useGetMealProductByCategoryQuery,
    useLazyGetMealProductByAreaQuery,
    useLazyGetMealProductByIngredientQuery,
} from "../../redux/services/mealApi";
import Filter from "../sellected/MealSellect";
import Pagination from "../pagination/Pagination";

export interface Meals {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

const MealList: React.FC = () => {
    const [mealCategorys, setMealCategorys] = useState<string[]>(["Beef"]);
    const [mealAreasFilter, setMealAreasFilter] = useState<string[]>([]);
    const [mealIngredientFilter, setMealIngredientFilter] = useState<string[]>([]);

    const [mealData, setMealData] = useState<Meals[]>([]);

    console.log("azerbaycan");

    const { data: categoryData, error, isLoading } = useGetMealProductByCategoryQuery({ categories: mealCategorys });

    const [getMealProductByArea, { data: fetchedAreaMealData, error: areaError }] = useLazyGetMealProductByAreaQuery();

    const [getMealProductByIngredient, { data: fetchedIngredientMealData, error: IngredientError }] =
        useLazyGetMealProductByIngredientQuery();

    // get category effect
    useEffect(() => {
        setMealData(categoryData);
    }, [categoryData]);

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
            setMealData(categoryData || []);
            return;
        }

        // Create a set of meal IDs from the category data for quick lookup
        const categoryMealIds = new Set(categoryData.map((product: any) => product.idMeal));

        if (fetchedAreaMealData && mealAreasFilter?.length > 0 && fetchedIngredientMealData && mealIngredientFilter?.length > 0) {
            const ingredientMealIds = new Set(fetchedIngredientMealData?.meals?.map((item) => item.idMeal));

            const commonMealIds = [...categoryMealIds].filter((id) => ingredientMealIds.has(id));

            const filteredMeals = fetchedAreaMealData?.meals?.filter((item) => commonMealIds.includes(item.idMeal));

            setMealData(filteredMeals);
        } else if (fetchedAreaMealData && mealAreasFilter?.length > 0) {
            const updatedMeals = fetchedAreaMealData?.meals?.filter((item) => categoryMealIds.has(item.idMeal));

            setMealData(updatedMeals);
        } else if (fetchedIngredientMealData && mealIngredientFilter?.length > 0) {
            const updatedMeals = fetchedIngredientMealData?.meals?.filter((item) => categoryMealIds.has(item.idMeal));

            setMealData(updatedMeals);
        } else {
            setMealData(categoryData);
        }
    }, [fetchedAreaMealData, fetchedIngredientMealData, categoryData, mealAreasFilter, mealIngredientFilter]);

    // category
    const addMealCategoryList = (newData: string[]) => {
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

    if (isLoading) return <Spin />;

    if (error || areaError || IngredientError)
        return <Alert message="Error" description="An error occurred while fetching the meals." type="error" />;

    return (
        <>
            <Filter
                addMealCategoryList={addMealCategoryList}
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
