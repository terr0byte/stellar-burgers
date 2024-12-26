import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
type initialState = {
  user: TUser;
  orders: TOrder[];
  authorized: boolean;
};

const initialState: initialState = {
  user: {
    name: '',
    email: ''
  },
  orders: [],
  authorized: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserData: (state) => state.user,
    getUserOrders: (state) => state.orders,
    getAuthorized: (state) => state.authorized
  },
  extraReducers: (builder) => {
    builder
      //USER DATA
      //log-in
      .addCase(loginUser.fulfilled, (state, action) => {
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user = action.payload.user;
        state.authorized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.error);
        console.log(2);
        if (action.error.code === '403' || action.error.code === '401') {
          console.log(2);
          deleteCookie('accessToken');
          state.user = {
            name: '',
            email: ''
          };
          state.authorized = false;
        }
      })
      //fetch user data with token
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authorized = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        if (action.error) {
          deleteCookie('accessToken');
          state.user = {
            name: '',
            email: ''
          };
          state.authorized = false;
        }
      })
      //log-out
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {
          name: '',
          email: ''
        };
        deleteCookie('accessToken');
        state.authorized = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log(action.error);
      })
      //register new user
      .addCase(registerUser.fulfilled, (state, action) => {
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user = action.payload.user;
        state.authorized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action.error);
      })
      //update user information
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action.error);
        if (action.error.code === '403' || action.error.code === '401') {
          deleteCookie('accessToken');
          state.user = {
            name: '',
            email: ''
          };
          state.authorized = false;
        }
      })
      //USER ORDER DATA
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        console.log(action.error);
      });
  }
});

export const fetchUser = createAsyncThunk('fetchUser', getUserApi);

export const loginUser = createAsyncThunk(
  'loginUser',
  ({ email, password }: TLoginData) => loginUserApi({ email, password })
);

export const registerUser = createAsyncThunk(
  'registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const updateUser = createAsyncThunk(
  'updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const fetchUserOrders = createAsyncThunk('fetchOrders', getOrdersApi);

export const logoutUser = createAsyncThunk('logoutUser', logoutApi);

export const { getUserData, getUserOrders, getAuthorized } =
  userSlice.selectors;
export default userSlice.reducer;
