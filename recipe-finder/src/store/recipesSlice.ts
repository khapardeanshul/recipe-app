import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MealSummary, RecipesResponse } from '../types/meal.types';
import { RootState } from "./store";

interface RecipesState {
    list: MealSummary[];
    loading: boolean;
    error: string | null;
    selectedIngredient: string | null;
    searchTerm: string;
}

const initialState: RecipesState = {
    list: [],
    loading: false,
    error: null,
    selectedIngredient: null,
    searchTerm: '',
};

export const fetchRecipesByIngredient = createAsyncThunk(
    'recipes/fetchRecipesByIngredient',
    async (ingredient: string) => {
        const response = await fetch(`http://localhost:8000/recipes/?ingredient=${ingredient}`);
        const data: RecipesResponse = await response.json();
        return { meals: data.meals, ingredient };
    }
);

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },

        clearRecipes: (state) => {
            state.list = [];
            state.error = null;
            state.selectedIngredient = null;
            state.searchTerm = '';
        },
    },

    extraReducers(builder) {
        // Handle Pending state
        builder.addCase(fetchRecipesByIngredient.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        // Handle Fulfilled state
        builder.addCase(fetchRecipesByIngredient.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.meals || [];
            state.selectedIngredient = action.payload.ingredient;
        });

        // Handle Rejected state
        builder.addCase(fetchRecipesByIngredient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch recipes';
        });
    },
    
});

export const { setSearchTerm, clearRecipes } = recipesSlice.actions;

// selectors
export const selectRecipes = (state: RootState) => state.recipes.list;
export const selectRecipesLoading = (state: RootState) => state.recipes.loading;
export const selectRecipesError = (state: RootState) => state.recipes.error;
export const selectRecipesSelectedIngredient = (state: RootState) => state.recipes.selectedIngredient;

export const selectFilteredRecipes = (state: RootState) => {
    const { list, searchTerm } = state.recipes;
    if (!searchTerm) return list;
    return list.filter(recipe =>
    recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  );

};
export default recipesSlice.reducer;