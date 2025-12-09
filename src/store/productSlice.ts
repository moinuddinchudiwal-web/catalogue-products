import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ProductState {
  list: Product[];
}

const initialState: ProductState = { list: [] };

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.list.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const idx = state.list.findIndex((p) => p.id === action.payload.id);
      if (idx >= 0) state.list[idx] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
