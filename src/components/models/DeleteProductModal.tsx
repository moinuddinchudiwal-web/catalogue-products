"use client";

import { deleteProduct } from "@/store/productSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { BaseModal } from "@/components/models/base-modal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteProductModalProps {
  open?: boolean;
  productId: string;
  onClose: () => void;
}

export default function DeleteProductModal({
  open,
  productId,
  onClose,
}: DeleteProductModalProps) {
  const dispatch = useDispatch();

  const [localOpen, setLocalOpen] = useState(open ?? true);

  useEffect(() => {
    if (typeof open === "boolean") {
      setLocalOpen(open);
    }
  }, [open]);

  const close = () => {
    setLocalOpen(false);
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    close();
    toast.error(`Product has been deleted!`);
  };

  return (
    <BaseModal
      open={localOpen}
      onClose={close}
      title="Delete Confirmation"
      description="Are you sure want to delete this product?"
      footer={
        <div className="flex justify-end gap-2 w-full">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      }
    ></BaseModal>
  );
}
