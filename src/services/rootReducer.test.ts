import rootReducer from './rootReducer';
import { configureStore, UnknownAction } from '@reduxjs/toolkit';
import { describe, test, expect } from '@jest/globals';

describe('Тестирование rootReducer', () => {
  test('rootReducer test', () => {
    const store = configureStore({ reducer: rootReducer });
    expect(store.getState()).toEqual(
      rootReducer(undefined, {} as UnknownAction)
    );
  });
});
