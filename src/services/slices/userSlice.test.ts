import { describe, test, expect } from '@jest/globals';
import userReducer, {
  fetchUser,
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  fetchUserOrders
} from './userSlice';

describe('Тестирование слайса user', () => {
  const initialState = {
    user: {
      name: '',
      email: ''
    },
    orders: [],
    isLoading: false,
    authorized: false
  };
  const testUser = {
    name: 'test',
    email: 'test'
  };
  const testResponse = {
    success: true,
    refreshToken: 'test',
    accessToken: 'test',
    user: testUser
  };
  const testLoginData = {
    email: '',
    password: ''
  };
  const testRegisterData = { ...testLoginData, name: '' };
  const testError = {
    name: 'test',
    message: 'test',
    code: '401'
  };
  test('Тестирование loginUser.fulfilled', () => {
    const testState = {
      user: testUser,
      orders: [],
      isLoading: false,
      authorized: true
    };
    const newState = userReducer(
      initialState,
      loginUser.fulfilled(testResponse, '', testLoginData)
    );
    expect(newState).toEqual(testState);
  });
  test('Тестирование loginUser.rejected', () => {
    const testState = {
      user: testUser,
      orders: [],
      isLoading: false,
      authorized: true
    };
    const newState = userReducer(
      testState,
      loginUser.rejected(testError, '', testLoginData)
    );
    expect(newState).toEqual(initialState);
  });
  test('Тестирование fetchUser.pending', () => {
    const newState = userReducer(initialState, fetchUser.pending(''));
    const { isLoading } = newState;
    expect(isLoading).toEqual(true);
  });
  test('Тестирование fetchUser.fulfilled', () => {
    const testState = {
      user: testUser,
      orders: [],
      isLoading: false,
      authorized: true
    };
    const newState = userReducer(
      initialState,
      fetchUser.fulfilled(testResponse, '')
    );
    expect(newState).toEqual(testState);
  });
  test('Тестирование fetchUser.rejected', () => {
    const testState = {
      user: testUser,
      orders: [],
      isLoading: false,
      authorized: true
    };
    const newState = userReducer(testState, fetchUser.rejected(testError, ''));
    expect(newState).toEqual(initialState);
  });
  test('Тестирование logoutUser.fulfilled', () => {
    const testState = {
      user: testUser,
      orders: [],
      isLoading: false,
      authorized: true
    };
    const testData = { ...testState, success: true };
    const newState = userReducer(testState, logoutUser.fulfilled(testData, ''));
    expect(newState).toEqual(initialState);
  });
  test('Тестирование logoutUser.rejected', () => {
    const testState = {
      user: testUser,
      orders: [],
      isLoading: true,
      authorized: true
    };
    const newState = userReducer(testState, logoutUser.rejected(testError, ''));
    const { isLoading } = newState;
    expect(isLoading).toEqual(false);
  });
  test('Тестирование registerUser.fulfilled', () => {
    const testState = {
      user: testUser,
      orders: [],
      isLoading: false,
      authorized: true
    };
    const newState = userReducer(
      initialState,
      registerUser.fulfilled(testResponse, '', testRegisterData)
    );
    expect(newState).toEqual(testState);
  });
  test('Тестирование registerUser.rejected', () => {
    const testState = {
      user: testUser,
      orders: [],
      isLoading: true,
      authorized: true
    };
    const newState = userReducer(
      testState,
      registerUser.rejected(testError, '', testRegisterData)
    );
    const { isLoading } = newState;
    expect(isLoading).toEqual(false);
  });
  test('Тестирование updateUser.fulfilled', () => {
    const testState = {
      user: testUser,
      orders: [],
      isLoading: false,
      authorized: true
    };
    const newState = userReducer(
      initialState,
      updateUser.fulfilled(testResponse, '', testRegisterData)
    );
    expect(newState).toEqual({ ...testState, authorized: false });
  });
  test('Тестирование updateUser.rejected', () => {
    const testState = {
      user: testUser,
      orders: [],
      isLoading: false,
      authorized: true
    };
    const newState = userReducer(
      testState,
      updateUser.rejected(testError, '', testRegisterData)
    );
    expect(newState).toEqual(initialState);
  });
  test('Тестирование fetchUserOrders.fulfilled', () => {
    const testOrders = [
      {
        _id: 'test',
        status: 'test',
        name: 'test',
        createdAt: 'test',
        updatedAt: 'test',
        number: 1,
        ingredients: ['test']
      }
    ];
    const newState = userReducer(
      initialState,
      fetchUserOrders.fulfilled(testOrders, '')
    );
    const { orders } = newState;
    expect(orders).toEqual(testOrders);
  });
});
