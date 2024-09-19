import React, { useEffect, useState } from "react";
import { Alert, Col, Row, Spin, Pagination, Divider } from "antd";
import { useGetMealCategorysQuery, useLazyGetMealProductByAreaQuery } from "../../redux/services/mealApi";
import Card from "./Card";
import usePagination from "../../hooks/usePagination";
import Filter from "../filters/MealFilter";

const MealList: React.FC = () => {
    const [mealCategorys, setMealCategorys] = useState<string[]>(["Beef"]);
    const [mealAreasFilter, setMealAreasFilter] = useState<string[]>([]);
    const [mealDate, setMealDate] = useState<any[]>([]);

    const { data: categoryData, error, isLoading } = useGetMealCategorysQuery({ categories: mealCategorys });

    const [getMealProductByArea, { data: fetchedAreaMealData, error: areaError }] = useLazyGetMealProductByAreaQuery();


    console.log("re-render")


    useEffect(() => {
        if (categoryData) {
            setMealDate(categoryData);
        }
    }, [categoryData]);

    useEffect(() => {
        if (mealAreasFilter.length > 0) getMealProductByArea({ searchItem: mealAreasFilter });
    }, [mealAreasFilter, getMealProductByArea]);


    useEffect(() => {
        if (fetchedAreaMealData && mealAreasFilter.length>0) {

            const categoryMealIds = new Set(categoryData.map(categoryProduct => categoryProduct.idMeal));
            const updatedMeals = fetchedAreaMealData.meals.filter((item) =>
                categoryMealIds.has(item.idMeal)
            );
           setMealDate(updatedMeals)
        }
        else{
            setMealDate(categoryData)
        }
    }, [fetchedAreaMealData,mealAreasFilter]);


    // pagination hooks
    const { currentPage, pageSize: size, paginate, setCurrentPage } = usePagination(mealDate?.length || 0, 12);

    // category
    const addMealCategoryList = (newData: string[]) => {
        // debugger;
        setMealCategorys(newData);
    };

    // area
    const handleMealAreasList = (area: string[]) => {
        setMealAreasFilter(area);
    };

    if (isLoading) return <Spin />;

    if (error || areaError) return <Alert message="Error" description="An error occurred while fetching the meals." type="error" />;

    return (
        <>
            <Filter
                addMealCategoryList={addMealCategoryList}
                mealCategorys={mealCategorys}
                onMealFilterList={handleMealAreasList}
                mealAreasFilter={mealAreasFilter}
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
