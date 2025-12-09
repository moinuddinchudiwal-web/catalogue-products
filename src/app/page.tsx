"use client";

import ProductCard from "@/components/common/ProductCard";
import ProductTable from "@/components/common/ProductTable";
import ProductModal from "@/components/models/ProductModal";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { LayoutGrid, List, Plus } from "lucide-react";
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
          <Button onClick={() => setOpenModal(true)}>
            <Plus className="w-4 h-4" /> Add Product
          </Button>

          <Button
            onClick={() => setView("grid")}
            variant={`${view === "grid" ? "default" : "secondary"}`}
            className="transition-all duration-300"
          >
            <LayoutGrid />
          </Button>
          <Button
            onClick={() => setView("list")}
            variant={`${view === "list" ? "default" : "secondary"}`}
            className="transition-all duration-300"
          >
            <List />
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <>
          {products.length === 0 ? (
            <div className="flex items-center justify-center text-gray-500 py-10">
              No products yet. Add one!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
