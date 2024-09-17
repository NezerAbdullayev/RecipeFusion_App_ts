import React from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, Typography, Alert } from "antd";
import { useGetDetailsByIdQuery } from "../../redux/services/mealApi";

const { Title, Paragraph } = Typography;

const DetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, error, isLoading } = useGetDetailsByIdQuery({ id });

    // Məlumatları yüklədiyimizi və ya səhv olduğunu yoxlayırıq
    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-full items-center justify-center">
                <Alert
                    message="Error"
                    description="There was an error fetching the product details."
                    type="error"
                />
            </div>
        );
    }

    if (!product || !product.meals || product.meals.length === 0) {
        return (
            <div className="flex h-full items-center justify-center">
                <Alert
                    message="No Product Found"
                    description="The product you are looking for does not exist."
                    type="warning"
                />
            </div>
        );
    }

    const meal = product.meals[0];

    return (
        <div style={{ padding: "20px" }}>
            <Card
                title={<Title level={2}>{meal.strMeal}</Title>}
                cover={<img alt={meal.strMeal} src={meal.strMealThumb} />}
                style={{ maxWidth: 600, margin: "0 auto" }}
            >
                <Typography>
                    <Paragraph>
                        <strong>Category:</strong> {meal.strCategory}
                    </Paragraph>
                    <Paragraph>
                        <strong>Area:</strong> {meal.strArea}
                    </Paragraph>
                    <Paragraph>
                        <strong>Instructions:</strong>
                    </Paragraph>
                    <Paragraph>{meal.strInstructions}</Paragraph>
                    {meal.strTags && (
                        <>
                            <Paragraph>
                                <strong>Tags:</strong> {meal.strTags}
                            </Paragraph>
                        </>
                    )}
                    {meal.strYoutube && (
                        <Paragraph>
                            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                                Watch Video
                            </a>
                        </Paragraph>
                    )}
                </Typography>
            </Card>
        </div>
    );
};

export default DetailsPage;
