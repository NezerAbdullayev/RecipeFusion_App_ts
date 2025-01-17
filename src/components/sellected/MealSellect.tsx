import { Alert, Col, Flex, Row, Select, Spin } from "antd";
import { useGetMealAreaListQuery, useGetMealCategoryListQuery, useGetMealIngredientsListQuery } from "../../redux/services/mealApi";
import { Typography } from "antd";
import { memo, useCallback } from "react";

const { Option } = Select;
const { Title } = Typography;

interface FilterProps {
    onMealCategoryList: (newData: string[]) => void;
    mealCategorys: string[];
    onMealFilterList: (area: string[]) => void;
    mealAreasFilter: string[];
    onMealIngredientList: (Ingredient: string[]) => void;
    mealIngredientFilter: string[];
}

const MealSellect: React.FC<FilterProps> = ({
    onMealCategoryList,
    mealCategorys,
    onMealFilterList,
    mealAreasFilter,
    onMealIngredientList,
    mealIngredientFilter,
}) => {
    // API queries
    const { data: mealCategory, error: mealCategoryError, isLoading: mealCategoryIsLoading } = useGetMealCategoryListQuery();
    const { data: mealArea, error: mealAreaError, isLoading: mealAreaIsLoading } = useGetMealAreaListQuery();
    const { data: mealsIngredient, error: mealIngredientError, isLoading: mealIngredientIsLoading } = useGetMealIngredientsListQuery();

    // Handlers for Select component changes
    const handleCategoryChange = useCallback(
        (value: string[]) => {
            onMealCategoryList(value);
        },
        [onMealCategoryList],
    );

    const handleAreaChange = useCallback(
        (value: string[]) => {
            onMealFilterList(value);
        },
        [onMealFilterList],
    );

    const handleIngredientChange = useCallback(
        (value: string[]) => {
            onMealIngredientList(value);
        },
        [onMealIngredientList],
    );

    // Error or loading handling
    if (mealCategoryError || mealAreaError || mealIngredientError)
        return <Alert message="Error" description="There was an error fetching data." type="error" />;

    if (mealCategoryIsLoading || mealAreaIsLoading || mealIngredientIsLoading) return <Spin />;

    return (
        <div>
            {/* Title and search input */}
            <Row justify="center">
                <Col>
                    <Title level={3} style={{ textAlign: "center", marginTop: "10px" }}>
                        Meal Products
                    </Title>
                </Col>
            </Row>

            {/* Select filters */}
            <Flex justify="center" gap="10px" style={{ margin: "20px" }}>
                {/* Meals Category Select */}
                <Select
                    mode="multiple"
                    placeholder="Meals Category"
                    style={{ width: 200, height: 56 }}
                    allowClear
                    maxTagCount={1}
                    value={mealCategorys}
                    onChange={handleCategoryChange}
                >
                    {mealCategory?.meals?.slice(0, 20)?.map((meal) => (
                        <Option key={meal.strCategory} value={meal.strCategory}>
                            {meal.strCategory}
                        </Option>
                    )) || <Option disabled>No categories available</Option>}
                </Select>

                {/* Meals Area Select */}
                <Select
                    mode="multiple"
                    placeholder="Meals Area"
                    maxTagCount={1}
                    style={{ width: 200, height: 56 }}
                    allowClear
                    value={mealAreasFilter}
                    onChange={handleAreaChange}
                >
                    {mealArea?.meals?.slice(0, 20)?.map((meal) => (
                        <Option key={meal.strArea} value={meal.strArea}>
                            {meal.strArea}
                        </Option>
                    )) || <Option disabled>No area available</Option>}
                </Select>

                {/* Meals Ingredient Select */}
                <Select
                    mode="multiple"
                    placeholder="Meals Ingredient"
                    maxTagCount={1}
                    style={{ width: 200, height: 56 }}
                    allowClear
                    value={mealIngredientFilter}
                    onChange={handleIngredientChange}
                >
                    {mealsIngredient?.meals?.slice(0, 50)?.map((meal) => (
                        <Option key={meal.strIngredient} value={meal.strIngredient}>
                            {meal.strIngredient}
                        </Option>
                    )) || <Option disabled>No Ingredient available</Option>}
                </Select>
            </Flex>
        </div>
    );
};

export default memo(MealSellect);
