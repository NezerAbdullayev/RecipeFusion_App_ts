import React, { memo } from "react";
import Card from "../products/Card";

import { Col, Row, Pagination as AntPagination, Divider } from "antd";
import usePagination from "../../hooks/usePagination";
import { CocktailProduct, MealProduct } from "../../types/globalTypes";

interface PaginationProps {
    data: (MealProduct | CocktailProduct)[];
}

const Pagination: React.FC<PaginationProps> = ({ data }) => {
    const { currentPage, pageSize: size, paginate, setCurrentPage } = usePagination(data?.length || 0, 12);

    return (
        <>
            {data?.length > 0 ? (
                <>
                    <Row gutter={[16, 16]} style={{ maxWidth: "90%", width: "1440px", margin: "0 auto" }}>
                        {paginate(data).map((product) => (
                            <Col key={product.idDrink || product.idMeal} xs={24} sm={12} md={8} lg={6} xl={6}>
                                <Card
                                    id={product.idMeal || product.idDrink}
                                    name={product.strDrink || product.strMeal}
                                    src={product.strDrinkThumb || product.strMealThumb}
                                />
                            </Col>
                        ))}
                    </Row>

                    <AntPagination
                        current={currentPage}
                        pageSize={size}
                        align="center"
                        total={data?.length || 0}
                        onChange={(page) => setCurrentPage(page)}
                        style={{ textAlign: "center", margin: "20px 0" }}
                        showSizeChanger={false}
                    />
                </>
            ) : (
                <div className="rounded bg-red-100 p-2 text-center text-red-500">No product found</div>
            )}
            <Divider />
        </>
    );
};

export default memo(Pagination);
