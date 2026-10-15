import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = { items: CartItem[] };

function loadCart(): CartState {
  try {
    const saved = localStorage.getItem('dilash-cart');
    if (!saved) return { items: [] };
    const parsed = JSON.parse(saved) as CartState;
    if (parsed && Array.isArray(parsed.items)) return parsed;
  } catch {
    // Ignore malformed or unavailable browser storage.
  }
  return { items: [] };
}

const initialState: CartState = loadCart();

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const item = state.items.find((entry) => entry.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((entry) => entry.id === action.payload.id);
      if (!item) return;
      if (action.payload.quantity <= 0) {
        state.items = state.items.filter((entry) => entry.id !== item.id);
      } else {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = slice.actions;
export default slice.reducer;
