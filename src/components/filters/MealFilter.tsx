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

interface FilterProps {
    addProducts: (newData: any) => void;
}

const Filter: React.FC<FilterProps> = ({ addProducts }) => {
    // API queries
    const {
        data: mealCategory,
        error: mealCategoryError,
        isLoading: mealCategoryIsLoading,
    } = useGetMealCategoryListQuery();

    const {
        data: mealArea,
        error: mealAreaError,
        isLoading: mealIsLoading,
    } = useGetMealAreaListQuery();

    const {
        data: mealsIngredient,
        error: mealIngredientError,
        isLoading: mealIngredientIsLoading,
    } = useGetMealIngredientsQuery();



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

    // Error or loading handling
    if (mealCategoryError || mealAreaError || mealIngredientError)
        return (
            <Alert message="Error" description="There was an error fetching data." type="error" />
        );

    if (mealCategoryIsLoading || mealIsLoading || mealIngredientIsLoading) return <Spin />;

    // Handlers for Select component changes
    const handleCategoryChange = (value: string[]) => {
        addProducts(value);
    };

    const handleAreaChange = (value: string[]) => {
        // setSelectedAreas(value);
        console.log("Selected Areas:", value);
    };

    const handleIngredientChange = (value: string[]) => {
        // setSelectedIngredients(value);
        console.log("Selected Ingredients:", value);
    };

    return (
        <div>
            {/* Title and search input */}
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

            {/* Select filters */}
            <Flex justify="center" gap="10px" style={{ margin: "20px" }}>
                {/* Meals Category Select */}
                <Select
                    mode="multiple"
                    placeholder="Meals Category"
                    style={{ width: 140, height: 56 }}
                    allowClear
                    maxTagCount={1}
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
                    placeholder="Meals Area"
                    style={{ width: 140, height: 56 }}
                    allowClear
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
                    placeholder="Meals Ingredient"
                    style={{ width: 140, height: 56 }}
                    allowClear
                    onChange={handleIngredientChange}
                >
                    {mealsIngredient?.meals?.slice(0, 20)?.map((meal) => (
                        <Option key={meal.strIngredient} value={meal.strIngredient}>
                            {meal.strIngredient}
                        </Option>
                    )) || <Option disabled>No Ingredient available</Option>}
                </Select>
            </Flex>
        </div>
    );
};

export default Filter;
