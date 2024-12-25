import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type initialState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: initialState = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(fetchFeed.pending, (state) => {
        state.orders = [];
      });
  }
});

export const fetchFeed = createAsyncThunk('fetchFeed', async () =>
  getFeedsApi()
);

export const { getFeedOrders, getTotal, getTotalToday } = feedSlice.selectors;
export default feedSlice.reducer;
