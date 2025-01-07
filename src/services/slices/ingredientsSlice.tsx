import { createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type initialState = {
  ingredientsLoading: boolean;
  ingredientsData: TIngredient[];
};

const initialState: initialState = {
  ingredientsLoading: true,
  ingredientsData: []
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredientsData,
    getLoading: (state) => state.ingredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredientsLoading = false;
        state.ingredientsData = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.ingredientsLoading = false;
        console.log(state);
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'fetchIngredrients',
  getIngredientsApi
);

export const { getIngredients, getLoading } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
