import React, { useState, useCallback, useEffect } from "react";
import {  Input, Row } from "antd";
import { debounce } from "lodash";
import { useLazyGetMealProductByNameQuery } from "../../redux/services/mealApi";
import { CocktailProduct, MealProduct } from "../../types/globalTypes";
import { useLazyGetCocktailProductByNameQuery } from "../../redux/services/cocktailApi";

interface SearchProps {
    onSearchData: (value: (MealProduct | CocktailProduct)[]) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchData }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [getMealProductByName, { data: mealData, isLoading: mealLoading }] = useLazyGetMealProductByNameQuery();

    const [getCocktailProductByName, { data: cocktailData, isLoading: coctailsLoading }] = useLazyGetCocktailProductByNameQuery();

    useEffect(() => {
        const meals: MealProduct[] = mealData?.meals ?? [];
        const drinks: CocktailProduct[] = cocktailData?.drinks ?? [];

        const combinedResults: (MealProduct | CocktailProduct)[] = [...meals, ...drinks];

        if (combinedResults.length) {
            onSearchData(combinedResults);
        } else {
            onSearchData([]);
        }
    }, [mealData, cocktailData, searchTerm]);

    const debouncedSearchMeals = useCallback(
        debounce((term) => {
            if (term?.length > 0) {
                getMealProductByName({ searchItem: term });
                getCocktailProductByName({ searchItem: term });
            } else onSearchData([]);
        }, 600),
        [],
    );

    const handleSearchInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setSearchTerm(value);
            debouncedSearchMeals(value.trim());
        },
        [debouncedSearchMeals],
    );

    const isProductAvailable = (cocktailData?.drinks && cocktailData.drinks.length > 0) || (mealData?.meals && mealData.meals.length > 0);

    return (
        <Row justify="center" style={{ flexDirection: "column", alignItems: "center" }}>
            <Input
                placeholder="Search..."
                value={searchTerm}
                allowClear
                onChange={handleSearchInputChange}
                style={{ width: "90%", height: 50, margin: "30px auto" }}
            />

            {searchTerm?.length > 0 && !isProductAvailable && !mealLoading && !coctailsLoading && (
                <div className="rounded bg-red-100 p-2 text-red-500">The product you are looking for is not available</div>
            )}
        </Row>
    );
};

export default Search;
