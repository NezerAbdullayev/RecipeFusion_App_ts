import React from "react";
import MealList from "./MealList";
import CocktailList from "./CocktailList";

const ProductsList: React.FC = () => (
    <div className="mt-10">
        <MealList />
        <CocktailList />
    </div>
);

export default ProductsList;
