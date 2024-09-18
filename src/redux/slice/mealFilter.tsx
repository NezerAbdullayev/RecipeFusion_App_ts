import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface ProductsState {
    categories: string[];
    ingredients: string[];
}

// Define initial state
const initialState: ProductsState = {
    categories: [],
    ingredients: [],
};

// Create the slice
const mealProductsSlice = createSlice({
    name: "mealProducts",
    initialState,
    reducers: {
        addMealCategory(state, action: PayloadAction<string>) {
            state.categories.push(action.payload);
        },
        removeMealCategoryItem(state, action: PayloadAction<string>) {
            state.categories = state.categories.filter(
                (ingredient) => ingredient !== action.payload,
            );
        },
    },
});

export const { addMealCategory, removeMealCategoryItem } = mealProductsSlice.actions;
export default mealProductsSlice.reducer;
