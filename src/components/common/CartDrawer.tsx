"use client";

import { addToCart, clearCart, removeFromCart } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { Minus, Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.list);

  const itemsInCart = products.filter((p) => cartItems[p.id]);

  if (!open) return null;

  const totalPrice = itemsInCart.reduce((sum, p) => sum + p.price * cartItems[p.id], 0);

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Cart</h2>
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {itemsInCart.length === 0 && (
          <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
        )}

        {itemsInCart.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 flex justify-between items-center bg-gray-50"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm">Category: {product.category}</p>
              <p className="text-gray-900 font-medium">₹{product.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(removeFromCart(product.id))}
                className="p-1 rounded hover:bg-gray-200"
              >
                <Minus className="w-4 h-4 text-red-500" />
              </button>
              <span className="font-medium">{cartItems[product.id]}</span>
              <button
                onClick={() => dispatch(addToCart(product.id))}
                className="p-1 rounded hover:bg-gray-200"
              >
                <Plus className="w-4 h-4 text-green-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {itemsInCart.length > 0 && (
        <div className="mt-auto">
          <p className="text-right font-semibold text-gray-800 mb-2">
            Total: ₹{totalPrice.toFixed(2)}
          </p>
          <button
            onClick={() => dispatch(clearCart())}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition mb-2"
          >
            Clear Cart
          </button>
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
