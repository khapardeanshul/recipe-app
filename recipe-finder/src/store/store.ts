import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import recipesReducer from './recipesSlice';
import recipeDetailReducer from './recipeDetailSlice';
import categoriesReducer from './categoriesSlice';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsReducer,
        recipes: recipesReducer,
        recipeDetail: recipeDetailReducer,
        categories: categoriesReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;