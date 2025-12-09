"use client";

import ProductCard from "@/components/common/ProductCard";
import ProductModal from "@/components/common/ProductModal";
import ProductTable from "@/components/common/ProductTable";
import { RootState } from "@/store/store";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const products = useSelector((state: RootState) => state.products.list);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [openModal, setOpenModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Products</h2>
        <div className="flex items-center gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={() => setOpenModal(true)}
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>

          <button
            className={`px-3 py-1 rounded ${view === "grid" ? "bg-gray-200" : ""}`}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            className={`px-3 py-1 rounded ${view === "list" ? "bg-gray-200" : ""}`}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <>
          {products.length === 0 ? (
            <div className="flex items-center justify-center text-gray-500 py-10">
              No products yet. Add one!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      ) : (
        <ProductTable products={products} />
      )}

      {openModal && <ProductModal onClose={() => setOpenModal(false)} />}
    </div>
  );
}
