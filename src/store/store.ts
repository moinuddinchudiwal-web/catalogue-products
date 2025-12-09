import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./productSlice";

const PERSIST_KEY = "product_catalog_state";

function loadState() {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw);

    return {
      products: {
        list: parsed?.products?.list ?? [],
      },
      cart: {
        items: parsed?.cart?.items ?? [],
      },
    };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState: typeof window !== "undefined" ? loadState() : undefined,
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem(
      PERSIST_KEY,
      JSON.stringify({
        products: { list: state.products.list },
        cart: { items: state.cart.items },
      })
    );
  } catch {}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
