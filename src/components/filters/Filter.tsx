import { Flex, Row, Spin } from "antd";
import FilterSelect from "./FilterSelect";
import {
    useGetMealAreaListQuery,
    useGetMealCategoryListQuery,
    useGetMealIngredientsQuery,
} from "../../redux/services/mealApi";

const filterData = {
    area: [],
};

function Filter() {
    // meal category
    const {
        data: mealCategory,
        error: mealCategoryError,
        isLoading: mealCategoryIsLoading,
    } = useGetMealCategoryListQuery();

    // meal area
    const {
        data: mealArea,
        error: mealAreaError,
        isLoading: mealIsLoading,
    } = useGetMealAreaListQuery();

    // meal Ingredient

    const {
        data: mealIngredient,
        error: mealIngredientError,
        isLoading: mealIngredientIsLoading,
    } = useGetMealIngredientsQuery();

    if (mealCategoryError || mealAreaError || mealIngredientError) console.log("error");
    if (mealCategoryIsLoading || mealIsLoading || mealIngredientIsLoading) <Spin />;

    return (
        <Flex>
            <FilterSelect data={mealCategory} />
            <FilterSelect data={mealArea} />
            <FilterSelect data={mealIngredient} />
        </Flex>
    );
}

export default Filter;
