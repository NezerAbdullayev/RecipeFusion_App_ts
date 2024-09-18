import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import productApi from "./services/mealApi";
import coctailApi from "./services/cocktailApi";
import mealProductsSlice from "./slice/mealFilter";

const store = configureStore({
    reducer: {
        mealProducts: mealProductsSlice,
        [productApi.reducerPath]: productApi.reducer,
        [coctailApi.reducerPath]: coctailApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware).concat(coctailApi.middleware),
});

setupListeners(store.dispatch);

export { store };
