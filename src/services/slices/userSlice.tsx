import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';
type initialState = {
  user: TUser;
  orders: TOrder[];
  isLoading: boolean;
  authorized: boolean;
};

const initialState: initialState = {
  user: {
    name: '',
    email: ''
  },
  orders: [],
  isLoading: true,
  authorized: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserData: (state) => state.user,
    getUserOrders: (state) => state.orders,
    getAuthorized: (state) => state.authorized,
    getIsLodaing: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      //USER DATA
      //log-in
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authorized = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.error);
        if (action.error.code === '403' || action.error.code === '401') {
          state.user = {
            name: '',
            email: ''
          };
          state.authorized = false;
          state.isLoading = false;
        }
      })
      //fetch user data with token
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authorized = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        if (action.error) {
          state.user = {
            name: '',
            email: ''
          };
          state.authorized = false;
          state.isLoading = false;
        }
      })
      //log-out
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {
          name: '',
          email: ''
        };
        state.authorized = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        console.log(action.error);
        state.isLoading = false;
      })
      //register new user
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authorized = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action.error);
        state.isLoading = false;
      })
      //update user information
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action.error);
        if (action.error.code === '403' || action.error.code === '401') {
          state.user = {
            name: '',
            email: ''
          };
          state.authorized = false;
          state.isLoading = false;
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

export const fetchUser = createAsyncThunk('fetchUser', () =>
  getUserApi().catch((error) => {
    deleteCookie('accessToken');
    return Promise.reject(error);
  })
);

export const loginUser = createAsyncThunk(
  'loginUser',
  ({ email, password }: TLoginData) =>
    loginUserApi({ email, password })
      .then((res) => {
        setCookie('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
      })
      .catch((error) => {
        deleteCookie('accessToken');
        return Promise.reject(error);
      })
);

export const registerUser = createAsyncThunk(
  'registerUser',
  async (data: TRegisterData) =>
    registerUserApi(data)
      .then((res) => {
        setCookie('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res;
      })
      .catch((error) => {
        deleteCookie('accessToken');
        return Promise.reject(error);
      })
);

export const updateUser = createAsyncThunk(
  'updateUser',
  async (data: Partial<TRegisterData>) =>
    updateUserApi(data)
      .then((res) => res)
      .catch((error) => {
        deleteCookie('accessToken');
        return Promise.reject(error);
      })
);

export const fetchUserOrders = createAsyncThunk('fetchOrders', getOrdersApi);

export const logoutUser = createAsyncThunk('logoutUser', () =>
  logoutApi()
    .then((data) => {
      deleteCookie('accessToken');
      return data;
    })
    .catch((error) => Promise.reject(error))
);

export const { getUserData, getUserOrders, getAuthorized, getIsLodaing } =
  userSlice.selectors;
export default userSlice.reducer;
