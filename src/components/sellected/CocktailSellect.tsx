import { Alert, Col, Flex, Row, Select, Spin } from "antd";

import { Typography } from "antd";
import { memo, useCallback } from "react";
import {
    useGetCocktailAlcoholicListQuery,
    useGetCocktailCategoryListQuery,
    useGetCocktailIngredientListQuery,
} from "../../redux/services/cocktailApi";

const { Option } = Select;
const { Title } = Typography;

interface FilterProps {
    onCocktailCategoryList: (newCategory: string[]) => void;
    onCocktailAlcoholicList: (drink: string[]) => void;
    onCocktailIngredientList: (ingredient: string[]) => void;
    cocktalCategoryList: string[];
    cocktailIngredientList: string[];
    coctailAlcoholicList: string[];
}

const CocktailSellect: React.FC<FilterProps> = ({
    onCocktailCategoryList,
    onCocktailAlcoholicList,
    onCocktailIngredientList,
    cocktalCategoryList,
    cocktailIngredientList,
    coctailAlcoholicList,
}) => {
    // API queries
    const {
        data: cocktailCategory,
        error: cocktailCategoryError,
        isLoading: cocktailCategoryIsLoading,
    } = useGetCocktailCategoryListQuery();

    const {
        data: cocktailAlcoholic,
        error: cocktailAlcoholicError,
        isLoading: cocktailAlcoholicIsLoading,
    } = useGetCocktailAlcoholicListQuery();

    const {
        data: cocktailIngredient,
        error: cocktailIngredientError,
        isLoading: cocktailIngredientIsLoading,
    } = useGetCocktailIngredientListQuery();

    // Handlers for Select component changes
    const handleCategoryChange = useCallback(
        (value: string[]) => {
            onCocktailCategoryList(value);
        },
        [onCocktailCategoryList],
    );

    const handleAlcoholicChange = useCallback(
        (value: string[]) => {
            onCocktailAlcoholicList(value);
        },
        [onCocktailAlcoholicList],
    );

    const handleIngredientChange = useCallback(
        (value: string[]) => {
            onCocktailIngredientList(value);
        },
        [onCocktailIngredientList],
    );

    // Error or loading handling
    if (cocktailCategoryError || cocktailAlcoholicError || cocktailIngredientError)
        return <Alert message="Error" description="There was an error fetching data." type="error" />;

    if (cocktailCategoryIsLoading || cocktailAlcoholicIsLoading || cocktailIngredientIsLoading) return <Spin />;

    return (
        <div>
            {/* Title and search input */}
            <Row justify="center">
                <Col>
                    <Title level={3} style={{ textAlign: "center", marginTop: "10px" }}>
                        Cocktail Products
                    </Title>
                </Col>
            </Row>

            {/* Select filters */}
            <Flex justify="center" gap="10px" style={{ margin: "20px" }}>
                {/* Cocktail Category Select */}
                <Select
                    mode="multiple"
                    placeholder="Cocktail Category"
                    style={{ width: 140, height: 56 }}
                    allowClear
                    maxTagCount={1}
                    value={cocktalCategoryList}
                    onChange={handleCategoryChange}
                >
                    {cocktailCategory?.drinks?.slice(0, 20)?.map((drink) => (
                        <Option key={drink.strCategory} value={drink.strCategory}>
                            {drink.strCategory}
                        </Option>
                    )) || <Option disabled>No categories available</Option>}
                </Select>

                {/* Cocktail Area Select */}
                <Select
                    mode="multiple"
                    placeholder="Cocktail Area"
                    maxTagCount={1}
                    style={{ width: 140, height: 56 }}
                    allowClear
                    value={coctailAlcoholicList}
                    onChange={handleAlcoholicChange}
                >
                    {cocktailAlcoholic?.drinks?.slice(0, 20)?.map((drink) => (
                        <Option key={drink.strAlcoholic} value={drink.strAlcoholic}>
                            {drink.strAlcoholic}
                        </Option>
                    )) || <Option disabled>No area available</Option>}
                </Select>

                {/* Cocktail Ingredient Select */}
                <Select
                    mode="multiple"
                    placeholder="Cocktail Ingredient"
                    maxTagCount={1}
                    style={{ width: 140, height: 56 }}
                    allowClear
                    value={cocktailIngredientList}
                    onChange={handleIngredientChange}
                >
                    {cocktailIngredient?.drinks?.slice(0, 50)?.map((drink) => (
                        <Option key={drink.strIngredient1} value={drink.strIngredient1}>
                            {drink.strIngredient1}
                        </Option>
                    )) || <Option disabled>No Ingredient available</Option>}
                </Select>
            </Flex>
        </div>
    );
};

export default memo(CocktailSellect);
