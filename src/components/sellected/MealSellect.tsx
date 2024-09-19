import { Alert, Col, Flex, Input, Row, Select, Spin } from "antd";
import { useGetMealAreaListQuery, useGetMealCategoryListQuery, useGetMealIngredientsListQuery } from "../../redux/services/mealApi";
import { Typography } from "antd";
import { SearchOutlined } from "@mui/icons-material";
import { memo, useCallback, useState } from "react";
import { debounce } from "lodash";

const { Option } = Select;
const { Title } = Typography;

interface FilterProps {
    addMealCategoryList: (newData: string[]) => void;
    mealCategorys: string[];
    onMealFilterList: (area: string[]) => void;
    mealAreasFilter: string[];
    onMealIngredientList: (Ingredient: string[]) => void;
    mealIngredientFilter: string[];
}

const MealSellect: React.FC<FilterProps> = ({
    addMealCategoryList,
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

    // Search functionality
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);

        if (value) debouncedSearchMeals(value);
    };

    const searchMeals = async (term: string) => {
        console.log("Searching for:", term);
    };

    const debouncedSearchMeals = useCallback(
        debounce((term) => searchMeals(term), 600),
        [],
    );

    // Handlers for Select component changes
    const handleCategoryChange = (value: string[]) => {
        addMealCategoryList(value);
    };

    const handleAreaChange = (value: string[]) => {
        onMealFilterList(value);
    };

    const handleIngredientChange = (value: string[]) => {
        onMealIngredientList(value);
    };

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
                    <Input placeholder="Product search" prefix={<SearchOutlined />} value={searchTerm} allowClear onChange={handleChange} />
                </Col>
            </Row>

            {/* Select filters */}
            <Flex justify="center" gap="10px" style={{ margin: "20px" }}>
                {/* Meals Category Select */}
                <Select
                    mode="multiple"
                    placeholder="Meals Category"
                    style={{ width: 140, height: 56 }}
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
                    style={{ width: 140, height: 56 }}
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
                    style={{ width: 140, height: 56 }}
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
