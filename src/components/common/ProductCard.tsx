"use client";

import { addToCart } from "@/store/cartSlice";
import { Product } from "@/store/productSlice";
import { Edit, ShoppingCart, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmModal from "./ConfirmModal";
import ProductModal from "./ProductModal";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-5 flex flex-col justify-between hover:shadow-xl transition cursor-pointer">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-500 mt-1 text-sm">Category: {product.category}</p>
        <p className="text-gray-900 mt-2 font-semibold text-lg">₹{product.price}</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setOpenEdit(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Edit className="w-5 h-5 text-blue-600" />
          </button>
          <button
            onClick={() => setOpenDelete(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Trash className="w-5 h-5 text-red-600" />
          </button>
        </div>

        <button
          onClick={() => dispatch(addToCart(product.id))}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg font-medium transition"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

      {openEdit && <ProductModal product={product} onClose={() => setOpenEdit(false)} />}
      {openDelete && (
        <ConfirmModal productId={product.id} onClose={() => setOpenDelete(false)} />
      )}
    </div>
  );
}
