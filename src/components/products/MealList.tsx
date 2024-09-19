import React, { useEffect, useState } from "react";
import { Alert, Col, Row, Spin, Pagination, Divider } from "antd";
import {
    useGetMealCategorysQuery,
    useLazyGetMealProductByAreaQuery,
    useLazyGetMealProductByIngredientQuery,
} from "../../redux/services/mealApi";
import Card from "./Card";
import usePagination from "../../hooks/usePagination";
import Filter from "../sellected/MealSellect";

const MealList: React.FC = () => {
    const [mealCategorys, setMealCategorys] = useState<string[]>(["Beef"]);
    const [mealAreasFilter, setMealAreasFilter] = useState<string[]>([]);
    const [mealIngredientFilter, setMealIngredientFilter] = useState<string[]>([]);

    const [mealDate, setMealDate] = useState<any[]>([]);

    const { data: categoryData, error, isLoading } = useGetMealCategorysQuery({ categories: mealCategorys });

    const [getMealProductByArea, { data: fetchedAreaMealData, error: areaError }] = useLazyGetMealProductByAreaQuery();

    const [getMealProductByIngredient, { data: fetchedIngredientMealData, error: IngredientError }] =
        useLazyGetMealProductByIngredientQuery();


        console.log("re-render")

    // get category effect
    useEffect(() => {
        setMealDate(categoryData);
    }, [categoryData]);

    // get area effect
    useEffect(() => {
        if (mealAreasFilter.length > 0) getMealProductByArea({ searchItem: mealAreasFilter });
    }, [mealAreasFilter, getMealProductByArea]);

    // get ingredient effect
    useEffect(() => {
        if (mealIngredientFilter?.length > 0) getMealProductByIngredient({ searchItem: mealIngredientFilter });
    }, [mealIngredientFilter]);

    // local filtered data
    useEffect(() => {
        // If categoryData is not available or both fetchedAreaMealData and fetchedIngredientMealData are not available,
        // simply set mealDate to categoryData
        if (!categoryData || (!fetchedAreaMealData && !fetchedIngredientMealData)) {
            setMealDate(categoryData || []);
            return;
        }

        // Create a set of meal IDs from the category data for quick lookup
        const categoryMealIds = new Set(categoryData.map((product) => product.idMeal));

        if (fetchedAreaMealData && mealAreasFilter?.length > 0 && fetchedIngredientMealData && mealIngredientFilter?.length > 0) {
            const ingredientMealIds = new Set(fetchedIngredientMealData?.meals?.map((item) => item.idMeal));

            const commonMealIds = [...categoryMealIds].filter((id) => ingredientMealIds.has(id));

            const filteredMeals = fetchedAreaMealData?.meals?.filter((item) => commonMealIds.includes(item.idMeal));

            setMealDate(filteredMeals);
        } else if (fetchedAreaMealData && mealAreasFilter?.length > 0) {
            const updatedMeals = fetchedAreaMealData?.meals?.filter((item) => categoryMealIds.has(item.idMeal));

            setMealDate(updatedMeals);
        } else if (fetchedIngredientMealData && mealIngredientFilter?.length > 0) {
            const updatedMeals = fetchedIngredientMealData?.meals?.filter((item) => categoryMealIds.has(item.idMeal));

            setMealDate(updatedMeals);
        } else {
            setMealDate(categoryData);
        }
    }, [fetchedAreaMealData, fetchedIngredientMealData, categoryData, mealAreasFilter, mealIngredientFilter]);

    // pagination hooks
    const { currentPage, pageSize: size, paginate, setCurrentPage } = usePagination(mealDate?.length || 0, 12);

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

            <Row gutter={[16, 16]} style={{ maxWidth: "90%", width: "1440px", margin: "0 auto" }}>
                {paginate(mealDate || []).map((meal) => (
                    <Col key={meal.idMeal} xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Card id={meal.idMeal} name={meal.strMeal} src={meal.strMealThumb} />
                    </Col>
                ))}
            </Row>

            <Pagination
                current={currentPage}
                pageSize={size}
                align="center"
                total={mealDate?.length || 0}
                onChange={(page) => setCurrentPage(page)}
                style={{ textAlign: "center", margin: "20px 0" }}
                showSizeChanger={false}
            />

            <Divider />
        </>
    );
};

export default MealList;
