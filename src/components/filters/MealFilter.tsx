import { Alert, Col, Flex, Input, Row, Select, Spin } from "antd";
import {
    useGetMealAreaListQuery,
    useGetMealCategoryListQuery,
    useGetMealIngredientsQuery,
} from "../../redux/services/mealApi";
import { Typography } from "antd";
import { SearchOutlined } from "@mui/icons-material";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

const { Option } = Select;
const { Title } = Typography;

function Filter() {
    // meal category
    const {
        data: mealCategory,
        error: mealCategoryError,
        isLoading: mealCategoryIsLoading,
    } = useGetMealCategoryListQuery();

    // meals area
    const {
        data: mealArea,
        error: mealAreaError,
        isLoading: mealIsLoading,
    } = useGetMealAreaListQuery();

    // meals Ingredient

    const {
        data: mealsIngredient,
        error: mealIngredientError,
        isLoading: mealIngredientIsLoading,
    } = useGetMealIngredientsQuery();
    const [searchTerm, setSearchTerm] = useState("");

    const searchMeals = async (term: string) => {
        console.log("Searching for:", term);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);

        if (value) debouncedSearchMeals(value);
    };

    const debouncedSearchMeals = useCallback(
        debounce((term) => searchMeals(term), 600),
        [],
    );

    // cocktail

    if (mealCategoryError || mealAreaError || mealIngredientError)
        return (
            <Alert message="Error" description="There was an error fetching data." type="error" />
        );

    if (mealCategoryIsLoading || mealIsLoading || mealIngredientIsLoading) return <Spin />;

    return (
        <div>
            {/* title */}
            <Row justify="center">
                <Col>
                    <Title level={3} style={{ textAlign: "center", marginTop: "10px" }}>
                        Meal Products
                    </Title>
                    <Input
                        placeholder="Product search"
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        allowClear
                        onChange={handleChange}
                    />
                </Col>
            </Row>

            {/* sellect items */}
            <Flex justify="center" gap="10px" style={{ margin: "20px" }}>
                {/* meals category */}
                <Select
                    mode="multiple" // Bir neçə seçimi aktiv etmək üçün
                    placeholder="Meals Category"
                    style={{ width: 140 }}
                    allowClear 
                >
                    {mealCategory?.meals?.slice(0, 20)?.map((meal) => (
                        <Option key={meal.strCategory} value={meal.strCategory}>
                            {meal.strCategory}
                        </Option>
                    )) || <Option disabled>No categories available</Option>}
                </Select>

                {/* meals area */}
                <Select placeholder="Meals Area" style={{ width: 140 }}>
                    {mealArea?.meals?.slice(0, 20)?.map((meal) => (
                        <Option key={meal.strArea} value={meal.strArea}>
                            {meal.strArea}
                        </Option>
                    )) || <Option disabled>No area available</Option>}
                </Select>
                {/* meals ingredient */}
                <Select placeholder="Meals Ingredient" style={{ width: 140 }}>
                    {mealsIngredient?.meals?.slice(0, 20)?.map((meal) => (
                        <Option key={meal.strIngredient} value={meal.strIngredient}>
                            {meal.strIngredient}
                        </Option>
                    )) || <Option disabled>No Ingredient available</Option>}
                </Select>
            </Flex>
        </div>
    );
}

export default Filter;
