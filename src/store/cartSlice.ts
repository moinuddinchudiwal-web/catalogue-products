import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: Record<string, number>;
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id] += 1;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.items[id]) return;
      if (state.items[id] === 1) {
        delete state.items[id];
      } else {
        state.items[id] -= 1;
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
