import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { error } from 'console';

type initialState = {
  ingredientsLoading: boolean;
  ingredientsData: TIngredient[];
  error: SerializedError | null;
};

const initialState: initialState = {
  ingredientsLoading: false,
  ingredientsData: [],
  error: null
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
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsLoading = false;
        state.error = action.error;
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'fetchIngredrients',
  getIngredientsApi
);

export const { getIngredients, getLoading } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
