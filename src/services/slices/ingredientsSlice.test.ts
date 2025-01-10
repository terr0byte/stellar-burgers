import { describe, test, expect } from '@jest/globals';
import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('Тестирование слайса ingredients', () => {
  const testData = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    }
  ];
  const initialState = {
    ingredientsLoading: false,
    ingredientsData: [],
    error: null
  };
  test('Тест fetchIngredients.fulfilled', () => {
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(testData, '')
    );

    const { ingredientsData } = newState;

    expect(ingredientsData).toEqual(testData);
  });
  test('Тест fetchIngredients.pending', () => {
    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.pending('')
    );

    const { ingredientsLoading } = newState;

    expect(ingredientsLoading).toEqual(true);
  });
  test('Тест fetchIngredients.rejected', () => {
    const testError = { name: 'testError', message: 'testErrorMessage' };

    const newState = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(testError, '')
    );

    const { ingredientsLoading } = newState;

    expect(ingredientsLoading).toEqual(false);
  });
});
