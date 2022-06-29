import { configureStore } from '@reduxjs/toolkit';
import  qtyCounterSlice from '../features/product/qtyCounterSlice'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    qtyCounterSlice,
    counter: counterReducer,
  },
});
