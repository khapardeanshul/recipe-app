import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Category, CategoriesResponse } from "../types/meal.types";
import { RootState } from "./store";
// import axios from "axios";

interface CategoriesState {
    list: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    list: [],
    loading: false,
    error: null,
}

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

        const response = await fetch(`${API_BASE_URL}/categories/`);
        const data: CategoriesResponse = await response.json();
        return data.categories;
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        // Handle pending state
        builder.addCase(fetchCategories.pending, (state) =>{
            state.loading = true;
            state.error = null;
        });

        // Hnadle fulfilled state
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        });

        // Handle rejected state
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch categories';
        });

    },
});


// selectors
export const selectCategories = (state: RootState): Category[] => state.categories.list;
export const selectCategoriesLoading = (state: RootState): boolean => state.categories.loading;
export const selectCategoriesError = (state: RootState): string | null => state.categories.error;

export default categoriesSlice.reducer;