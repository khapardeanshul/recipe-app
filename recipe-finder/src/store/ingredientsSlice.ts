import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient, IngredientResponse } from '../types/meal.types'; 
import { RootState } from './store';


interface IngredientsState {
    list: Ingredient[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    currentPage: number;
    totalPages: number;
}

const initialState: IngredientsState = {
    list: [],
    loading: false,
    error: null,
    searchTerm: '',
    currentPage: 1,
    totalPages: 1,
};


export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async ({ searchTerm, page }: { searchTerm: string; page: number }) => {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
        // Append the search parameter to the url
        // const url = searchTerm
        //     ? `${API_BASE_URL}/ingredients/?search=${searchTerm}`
        //     : `${API_BASE_URL}/ingredients/`;
        // const response = await fetch(url);
        const url = `${API_BASE_URL}/ingredients/?search=${searchTerm}&page=${page}`;
        const response = await fetch(url);
        const data: IngredientResponse = await response.json();
        return data;
    }
);

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },

    extraReducers: (builder) => {
    // Handle Pending state 
    builder.addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
    });


    // Handle Fulfilled state
    builder.addCase(fetchIngredients.fulfilled, (state, action) =>{
        state.loading = false;
        state.list = action.payload.meals;
        state.totalPages = action.payload.total_pages;
    });

    // Handle Rejected state
    builder.addCase(fetchIngredients.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.error.message || 'Failed to Fetch Ingredients';
    });

},
});

export const { setSearchTerm, setCurrentPage } = ingredientsSlice.actions;

// Selectors

export const selectAllIngredients = (state: RootState): Ingredient[] => state.ingredients.list;
export const selectIngredientsLoading = (state: RootState): boolean => state.ingredients.loading;
export const selectIngredientsError = (state: RootState): string | null => state.ingredients.error;
export const selectIngredientsSearchTerm = (state:RootState): string => state.ingredients.searchTerm;
export const selectIngredientsCurrentPage = (state: RootState): number => state.ingredients.currentPage;

// export const selectFilteredIngredients = (state: RootState): 
export const selectFilteredIngredients = (state: RootState) => state.ingredients.list;
    // const {list, searchTerm} = state.ingredients
    // if (!searchTerm) {
    //     return list; }

    // return list.filter(ingredient => {
    //     return ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())
    // });    
    // return state.ingredients.list;

// };

export const selectPaginatedIngredients = (state: RootState) => state.ingredients.list;
//     const filtered = selectFilteredIngredients(state)
//     const itemsPerPage = 20
//     const { currentPage } = state.ingredients
//     const startIndex = (currentPage - 1) * itemsPerPage;
//   return filtered.slice(startIndex, startIndex + itemsPerPage);
    
// };

export const selectTotalPages = (state: RootState) => state.ingredients.totalPages;
//     const filtered = selectFilteredIngredients(state)
//     return Math.ceil (filtered.length / 20)
// }


export default ingredientsSlice.reducer;