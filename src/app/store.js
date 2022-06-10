import { configureStore } from '@reduxjs/toolkit';
import  qtyCounterSlice from '../features/product/qtyCounterSlice'

export const store = configureStore({
  reducer: {
    qtyCounterSlice,
  },
});
