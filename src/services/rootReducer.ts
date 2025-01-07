import ingredientsSliceReducer from './slices/ingredientsSlice';
import burgerConsturctorReducer from './slices/burgerConstructorSlice';
import feedReducer from './slices/feedSlice';
import userReducer from './slices/userSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConsturctorReducer,
  feed: feedReducer,
  user: userReducer
});

export default rootReducer;
