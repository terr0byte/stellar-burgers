import { describe, test, expect } from '@jest/globals';
import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient
} from './burgerConstructorSlice';

describe('Тестирование слайса burgerConstructor', () => {
  test('Тест на добавление ингредиента', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      isLoading: false,
      orderData: null
    };
    const testBun = {
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
    };
    const newState = burgerConstructorReducer(
      initialState,
      addIngredient(testBun)
    );
    const {
      constructorItems: { bun }
    } = newState;
    expect(bun).toBeTruthy();
  });
  test('Тест на удаление ингредиента', () => {
    const testIngredient = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
      id: '1'
    };
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [testIngredient]
      },
      isLoading: false,
      orderData: null
    };
    const newState = burgerConstructorReducer(
      initialState,
      removeIngredient(testIngredient)
    );
    const {
      constructorItems: { ingredients }
    } = newState;
    expect(ingredients).toEqual([]);
  });
  test('Тест на перемещение ингредиента', () => {
    const testIngredient1 = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
      id: '1'
    };
    const testIngredient2 = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
      id: '2'
    };
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [testIngredient1, testIngredient2]
      },
      isLoading: false,
      orderData: null
    };
    const newState = burgerConstructorReducer(
      initialState,
      moveUpIngredient(1)
    );
    const {
      constructorItems: { ingredients }
    } = newState;
    expect(ingredients).toEqual([testIngredient2, testIngredient1]);
  });
});
