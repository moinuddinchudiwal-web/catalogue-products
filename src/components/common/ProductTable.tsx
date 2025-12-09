"use client";

import DeleteProductModal from "@/components/models/DeleteProductModal";
import ProductModal from "@/components/models/ProductModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white">
      <TooltipProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                  No products yet. Add one!
                </TableCell>
              </TableRow>
            )}

            {products.map((p) => (
              <TableRow key={p.id} className="hover:bg-gray-50 transition">
                <TableCell className="font-medium text-gray-800">{p.name}</TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell className="text-gray-600">{p.category}</TableCell>
                <TableCell className="flex gap-2">
                  {/* Edit */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditProduct(p)}
                        className="cursor-pointer"
                        aria-label="Edit Product"
                      >
                        <Edit className="w-5 h-5 text-blue-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit Product</TooltipContent>
                  </Tooltip>

                  {/* Delete */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteProductId(p.id)}
                        className="cursor-pointer"
                        aria-label="Delete Product"
                      >
                        <Trash className="w-5 h-5 text-red-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete Product</TooltipContent>
                  </Tooltip>

                  {/* Add to Cart */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          dispatch(addToCart(p.id));
                          toast.success(`${p.name} added to cart!`);
                        }}
                        className="cursor-pointer text-green-600 border-green-600 hover:bg-green-50"
                        aria-label="Add to Cart"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add to Cart</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TooltipProvider>

      {editProduct && (
        <ProductModal product={editProduct} onClose={() => setEditProduct(null)} />
      )}
      {deleteProductId && (
        <DeleteProductModal
          productId={deleteProductId}
          onClose={() => setDeleteProductId(null)}
        />
      )}
    </div>
  );
}
