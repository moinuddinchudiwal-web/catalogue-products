"use client";

import { deleteProduct } from "@/store/productSlice";
import { Trash2, X } from "lucide-react";
import { useDispatch } from "react-redux";

interface Props {
  productId: string;
  onClose: () => void;
}

export default function ConfirmModal({ productId, onClose }: Props) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex flex-col items-center gap-4">
          <Trash2 className="w-10 h-10 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            Are you sure you want to delete this product?
          </h2>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
