"use client";

import { RootState } from "@/store/store";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-50 shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-gray-900">Catalogue Products</h1>

        <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
          <ShoppingCart className="w-8 h-8 text-gray-700 hover:text-gray-900 transition-colors" />
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
              {totalCount}
            </span>
          )}
        </div>
      </header>

      {isCartOpen && (
        <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}
