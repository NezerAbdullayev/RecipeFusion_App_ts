import React, { useState } from "react";
import { Alert, Col, Divider, Pagination, Row, Spin } from "antd";
import Card from "./Card";
import { useGetCoctailProductsQuery } from "../../redux/services/cocktailApi";
import usePagination from "../../hooks/usePagination";

const CocktailList: React.FC = () => {
    // const [mealCategorys, setMealCategorys] = useState<string[]>(["Beef"]);
    const { data, error, isLoading } = useGetCoctailProductsQuery();

    const {
        currentPage,
        pageSize: size,
        paginate,
        setCurrentPage,
    } = usePagination(data?.drinks?.length || 0, 10);

    if (isLoading) return <Spin />;
    if (error)
        return (
            <Alert
                message="Error"
                description="An error occurred while fetching the coctails."
                type="error"
            />
        );

    return (
        <>
            <Row gutter={[16, 16]} style={{ maxWidth: "90%", width: "1440px", margin: "0 auto" }}>
                {paginate(data?.drinks || []).map((drink) => (
                    <Col key={drink.idDrink} xs={24} sm={12} md={8} lg={6} xl={6}>
                        <Card id={drink.idDrink} name={drink.strDrink} src={drink.strDrinkThumb} />
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                pageSize={size}
                align="center"
                total={data?.drinks?.length || 0}
                onChange={(page) => setCurrentPage(page)}
                style={{ textAlign: "center", margin: "20px 0" }}
                showSizeChanger={false}
            />

            <Divider />
        </>
    );
};

export default CocktailList;
