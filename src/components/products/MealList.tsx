import React, { useEffect, useState } from "react";
import { Alert, Col, Row, Spin, Pagination, Divider } from "antd";
import { useLazyGetMealCategorysQuery } from "../../redux/services/mealApi";
import Card from "./Card";
import usePagination from "../../hooks/usePagination";
import Filter from "../filters/MealFilter";

const MealList: React.FC = () => {
    const [mealCategorys, setMealCategorys] = useState<string[]>([]);
    const [mealDate, setMealDate] = useState<any[]>([]);

    const [getMealByCategory, { error, isLoading }] = useLazyGetMealCategorysQuery();

    console.log(mealCategorys);

    useEffect(() => {
        const fetchMealCategories = async () => {
            if (mealCategorys?.length > 0) {
                try {
                    const allMeals = await Promise.all(
                        mealCategorys.map(async (category) => {
                            const response = await getMealByCategory({ category }).unwrap();
                            return response.meals;
                        }),
                    );
                    setMealDate(allMeals.flat());
                } catch (error) {
                    console.error(error);
                }
            } else setMealDate([]);
        };

        fetchMealCategories();
    }, [mealCategorys, getMealByCategory, setMealCategorys]);

    console.log(mealDate);

    const addMealCategoryList = (newData: string[]) => {
        setMealCategorys(newData);
    };

    const {
        currentPage,
        pageSize: size,
        paginate,
        setCurrentPage,
    } = usePagination(mealDate?.length || 0, 12);

    if (isLoading) return <Spin />;
    if (error)
        return (
            <Alert
                message="Error"
                description="An error occurred while fetching the meals."
                type="error"
            />
        );

    return (
        <>
            <Filter addMealCategoryList={addMealCategoryList} mealCategorys={mealCategorys} />

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
