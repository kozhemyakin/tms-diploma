import { configureStore } from '@reduxjs/toolkit';
import  qtyCounterSlice from '../features/product/qtyCounterSlice'
import productSlice from '../features/product/productsSlice'

export const store = configureStore({
  reducer: {
    qtyCounterSlice,
    product: productSlice,
  },
});
