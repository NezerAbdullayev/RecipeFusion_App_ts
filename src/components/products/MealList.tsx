import React from "react";
import { Alert, Col, Row, Spin, Pagination, Divider } from "antd";
import { useGetMealProductsQuery } from "../../redux/services/mealApi";
import Card from "./Card";
import usePagination from "../../hooks/usePagination";

const MealList: React.FC = () => {
    const { data, error, isLoading } = useGetMealProductsQuery();

    const {
        currentPage,
        pageSize: size,
        paginate,
        setCurrentPage,
    } = usePagination(data?.meals?.length || 0, 10);

    if (isLoading) return <Spin />;
    if (error)
        return (
            <Alert
                message="Error"
                description="An error occurred while fetching the meals."
                type="error"
            />
        );

        console.log(data)

    return (
        <>
            <Row gutter={[16, 16]} style={{ maxWidth: "90%", width: "1440px", margin: "0 auto" }}>
                {paginate(data?.meals || []).map((meal) => (
                    <Col key={meal.idMeal} xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Card id={meal.idMeal} name={meal.strMeal} src={meal.strMealThumb} />
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                pageSize={size}
                align="center"
                total={data?.meals?.length || 0}
                onChange={(page) => setCurrentPage(page)}
                style={{ textAlign: "center", margin: "20px 0" }}
                showSizeChanger={false}
            />

            <Divider />
        </>
    );
};

export default MealList;
