import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MealDetail, RecipeDetailResponse } from '../types/meal.types';
import {RootState} from './store';
// import axios from 'axios';

interface RecipeDetailState {
    data: MealDetail | null;
    loading: boolean;
    error: string | null;
};

const initialState: RecipeDetailState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchRecipeDetail = createAsyncThunk(
    'recipeDetail/fetchRecipeDetail',
    async (id: string) => {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        // const response = await axios.get(`${API_BASE_URL}/recipes/${id}`);
        const response = await fetch(`${API_BASE_URL}/recipes/${id}/`);
        const data: RecipeDetailResponse = await response.json();
        return data.meals?.[0] || null;
    }
);


const recipeDetailSlice = createSlice({
    name: 'recipeDetail',
    initialState,
    reducers: {
        clearRecipeDetail: (state) =>{
            state.data = null;
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        // Handle Pending state
        builder.addCase(fetchRecipeDetail.pending, (state) =>{
            state.loading = true;
            state.error = null;
        });

        // Handle Filfilled state
        builder.addCase(fetchRecipeDetail.fulfilled, (state, action) =>{
            state.loading = false;
            state.data = action.payload;
        });

        // Handle Rejected state
        builder.addCase(fetchRecipeDetail.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch recipe detail';
        });
    }
});

export const { clearRecipeDetail } = recipeDetailSlice.actions;

// selectors
export const selectRecipeDetail = (state: RootState) => state.recipeDetail.data;
export const selectRecipeDetailLoading = (state: RootState) => state.recipeDetail.loading;
export const selectRecipeDetailError = (state: RootState) => state.recipeDetail.error;


export default recipeDetailSlice.reducer;
