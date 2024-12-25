import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

type initialState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  orderData: TOrder | null;
};

const initialState: initialState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  orderData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    //ADD NEW INGREDIENT TO BURGER CONSTRUCTOR
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: nanoid()
        });
      }
    },
    //REMOVE INGREDIENT FROM BURGER CONSTRUCTOR
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id != action.payload.id
        );
    },
    //MOVE INGREDIENT IN HIERARCHY
    moveUpIngredient: (state, action) => {
      const f = state.constructorItems.ingredients.splice(action.payload, 1)[0];
      state.constructorItems.ingredients.splice(action.payload - 1, 0, f);
    },
    moveDownIngredient: (state, action) => {
      const f = state.constructorItems.ingredients.splice(action.payload, 1)[0];
      state.constructorItems.ingredients.splice(action.payload + 1, 0, f);
    },
    //RESET BURGET CONSTRUCTOR
    resetBurgerConstructor: (state) => {
      state.orderData = null;
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getLoadingState: (state) => state.isLoading,
    getOrderData: (state) => state.orderData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.error);
      });
  }
});

export const createOrder = createAsyncThunk(
  'createOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const {
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient,
  resetBurgerConstructor
} = burgerConstructorSlice.actions;
export const { getConstructorItems, getLoadingState, getOrderData } =
  burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
