import rootReducer from './rootReducer';
import { configureStore, UnknownAction } from '@reduxjs/toolkit';
import { describe, test, expect } from '@jest/globals';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import feedReducer from './slices/feedSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';

describe('Тестирование rootReducer', () => {
  test('rootReducer test', () => {
    const store = configureStore({ reducer: rootReducer });
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, {} as UnknownAction)
    );
    expect(store.getState().feed).toEqual(
      feedReducer(undefined, {} as UnknownAction)
    );
    expect(store.getState().ingredients).toEqual(
      ingredientsReducer(undefined, {} as UnknownAction)
    );
    expect(store.getState().user).toEqual(
      userReducer(undefined, {} as UnknownAction)
    );
  });
});
