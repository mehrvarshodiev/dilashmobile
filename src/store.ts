import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem('dilash-cart', JSON.stringify(store.getState().cart));
  } catch {
    // Storage can be unavailable in private browsing; the cart still works in memory.
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
