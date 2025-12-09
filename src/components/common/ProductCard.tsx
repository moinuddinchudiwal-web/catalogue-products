"use client";

import DeleteProductModal from "@/components/models/DeleteProductModal";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/store/productSlice";
import { Edit, ShoppingCart, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import ProductModal from "../models/ProductModal";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-300 cursor-default">
      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-500 text-sm">Category: {product.category}</p>
        <p className="text-gray-900 font-medium text-lg">₹{product.price}</p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenEdit(true)}
                  className="cursor-pointer"
                  aria-label="Edit Product"
                >
                  <Edit className="w-5 h-5 text-blue-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Product</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpenDelete(true)}
                  className="cursor-pointer"
                  aria-label="Delete Product"
                >
                  <Trash className="w-5 h-5 text-red-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Product</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  dispatch(addToCart(product.id));
                  toast.success(`${product.name} added to cart!`);
                }}
                className="cursor-pointer text-green-600 border-green-600 hover:bg-green-50"
                aria-label="Add to Cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add to Cart</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Modals */}
      {openEdit && <ProductModal product={product} onClose={() => setOpenEdit(false)} />}
      {openDelete && (
        <DeleteProductModal productId={product.id} onClose={() => setOpenDelete(false)} />
      )}
    </div>
  );
}
