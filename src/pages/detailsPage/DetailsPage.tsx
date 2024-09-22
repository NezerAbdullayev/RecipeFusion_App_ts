import React from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, Typography, Alert } from "antd";
import { useGetDetailsByIdQuery } from "../../redux/services/mealApi";
import { useGetCocktailProductDetailsByIdQuery } from "../../redux/services/cocktailApi";

const { Title, Paragraph } = Typography;

interface Meal {
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea?: string;
    strInstructions: string;
    strTags?: string;
    strYoutube?: string;
}

interface Cocktail {
    strDrink: string;
    strDrinkThumb: string;
    strCategory: string;
    strAlcoholic: string;
    strInstructions: string;
    strTags?: string;
    strYoutube?: string;
}

const DetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string;}>();

    const { data: mealDetailsData, error: mealError, isLoading: mealLoading } = useGetDetailsByIdQuery({ id });
    const { data: cocktailDetailsData, error: cocktailError, isLoading: cocktailLoading } = useGetCocktailProductDetailsByIdQuery({ id });

    // Loading state
    if (mealLoading || cocktailLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    // Error handling
    if (mealError || cocktailError) {
        return (
            <div className="flex h-full items-center justify-center">
                <Alert message="Error" description="There was an error fetching the product details." type="error" />
            </div>
        );
    }

    const mealDataExists = mealDetailsData?.meals && mealDetailsData?.meals?.length > 0;
    const cocktailDataExists = cocktailDetailsData?.drinks && cocktailDetailsData?.drinks?.length > 0;

    if (!mealDataExists && !cocktailDataExists) {
        return (
            <div className="flex h-full items-center justify-center">
                <Alert message="No Product Found" description="The product you are looking for does not exist." type="warning" />
            </div>
        );
    }

    const product: any = mealDataExists ? mealDetailsData?.meals?.[0] : cocktailDetailsData?.drinks?.[0];

    return (
        <div style={{ padding: "20px" }}>
            <Card
                title={<Title level={2}>{(product as Meal).strMeal || (product as Cocktail).strDrink}</Title>}
                cover={
                    <img
                        alt={(product as Meal).strMeal || (product as Cocktail).strDrink}
                        src={(product as Meal).strMealThumb || (product as Cocktail).strDrinkThumb}
                    />
                }
                style={{ maxWidth: 600, margin: "0 auto" }}
            >
                <Typography>
                    <Paragraph>
                        <strong>Category:</strong> {(product as Meal).strCategory}
                    </Paragraph>
                    <Paragraph>
                        <strong>{(product as Meal).strArea ? "Area" : "Alcoholic"}:</strong>{" "}
                        {(product as Meal).strArea || (product as Cocktail).strAlcoholic}
                    </Paragraph>
                    <Paragraph>
                        <strong>Instructions:</strong>
                    </Paragraph>
                    <Paragraph>{(product as Meal).strInstructions || (product as Cocktail).strInstructions}</Paragraph>
                    {(product as Meal).strTags && (
                        <Paragraph>
                            <strong>Tags:</strong> {(product as Meal).strTags}
                        </Paragraph>
                    )}
                    {(product as Cocktail).strYoutube && (
                        <Paragraph>
                            <a href={(product as Cocktail).strYoutube} target="_blank" rel="noopener noreferrer">
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
