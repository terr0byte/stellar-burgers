import { describe, test, expect } from '@jest/globals';
import feedReducer, { fetchFeed } from './feedSlice';

describe('Тестирование слайса feed', () => {
  const testData = {
    success: true,
    total: 1,
    totalToday: 1,
    orders: [
      {
        _id: 'test',
        status: 'test',
        name: 'test',
        createdAt: 'test',
        updatedAt: 'test',
        number: 1,
        ingredients: ['test']
      }
    ]
  };
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0
  };
  test('Тест fetchfeed.fulfilled', () => {
    const newState = feedReducer(
      initialState,
      fetchFeed.fulfilled(testData, '')
    );
    const { orders, total, totalToday } = newState;
    expect(orders).toEqual(testData.orders);
    expect(total).toEqual(testData.total);
    expect(totalToday).toEqual(testData.totalToday);
  });
});
