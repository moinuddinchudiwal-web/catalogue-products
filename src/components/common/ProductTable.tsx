"use client";

import { addToCart } from "@/store/cartSlice";
import { Product } from "@/store/productSlice";
import { Edit, ShoppingCart, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ConfirmModal from "./ConfirmModal";
import ProductModal from "./ProductModal";

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left text-gray-700">Name</th>
            <th className="p-3 text-left text-gray-700">Price</th>
            <th className="p-3 text-left text-gray-700">Category</th>
            <th className="p-3 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td className="p-4 text-center text-gray-500" colSpan={4}>
                No products yet. Add one!
              </td>
            </tr>
          )}

          {products.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50 transition">
              <td className="p-3 text-gray-800 font-medium">{p.name}</td>
              <td className="p-3 text-gray-800">₹{p.price}</td>
              <td className="p-3 text-gray-600">{p.category}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => setEditProduct(p)}
                  className="p-2 rounded hover:bg-gray-100 transition"
                  title="Edit"
                >
                  <Edit className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => setDeleteProductId(p.id)}
                  className="p-2 rounded hover:bg-gray-100 transition"
                  title="Delete"
                >
                  <Trash className="w-5 h-5 text-red-600" />
                </button>
                <button
                  onClick={() => dispatch(addToCart(p.id))}
                  className="p-2 rounded hover:bg-green-100 flex items-center gap-1 transition"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-4 h-4 text-green-600" /> Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProduct && (
        <ProductModal product={editProduct} onClose={() => setEditProduct(null)} />
      )}

      {deleteProductId && (
        <ConfirmModal
          productId={deleteProductId}
          onClose={() => setDeleteProductId(null)}
        />
      )}
    </div>
  );
}
