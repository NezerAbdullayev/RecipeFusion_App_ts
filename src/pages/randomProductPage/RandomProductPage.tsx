import React from "react";
import { useLazyGetMealRandomMealQuery } from "../../redux/services/mealApi";
import { useLazyGetCocktailRandomProductQuery } from "../../redux/services/cocktailApi";
import { Alert, Button, Spin, Card, Row, Col } from "antd";

const RandomProductPage: React.FC = () => {
    const [GetMealRandomMeal, { data: mealData, error: mealError, isLoading: mealLoading }] = useLazyGetMealRandomMealQuery();
    const [GetCocktailRandomProduct, { data: cocktailData, error: cocktailError, isLoading: cocktailLoading }] =
        useLazyGetCocktailRandomProductQuery();

    const handleRandomClick = () => {
        GetMealRandomMeal();
        GetCocktailRandomProduct();
    };

    return (
        <div className="w-[1000px] p-5 mx-auto max-w-[80%]">
            <Row justify="center" style={{ marginBottom: "20px" }}>
                <Col>
                    <Button type="primary" onClick={handleRandomClick}>
                        Get Random Products
                    </Button>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                {/* random meal */}
                <Col span={12}>
                    {mealData?.meals && (
                        <Card cover={<img src={mealData.meals[0]?.strMealThumb} alt="meal" />}>
                            <p>{mealData.meals[0]?.strMeal}</p>
                        </Card>
                    )}

                    {mealLoading && (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <Spin />
                            <p>Loading random products...</p>
                        </div>
                    )}

                    {mealError && <Alert message="Error" description="Failed to load meal data. Please try again later." type="error" />}
                </Col>

                {/* random cocktail */}
                <Col span={12}>
                    {cocktailData?.drinks && (
                        <Card cover={<img src={cocktailData.drinks[0]?.strDrinkThumb} alt="cocktail" />}>
                            <p>{cocktailData.drinks[0]?.strDrink}</p>
                        </Card>
                    )}

                    {cocktailLoading && (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <Spin />
                            <p>Loading random products...</p>
                        </div>
                    )}

                    {cocktailError && (
                        <Alert message="Error" description="Failed to load cocktail data. Please try again later." type="error" />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default RandomProductPage;
