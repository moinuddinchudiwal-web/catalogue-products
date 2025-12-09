"use client";

import { addProduct, Product, updateProduct } from "@/store/productSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { BaseModal } from "@/components/models/base-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
  product?: Product;
}

interface FormValues {
  name: string;
  price: number;
  category: string;
}

export default function ProductModal({ onClose, product }: Props) {
  const dispatch = useDispatch();
  const isEdit = !!product;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      category: product?.category || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (isEdit) {
      dispatch(updateProduct({ ...product!, ...data }));
      toast(`${data.name} updated successfully`);
    } else {
      dispatch(addProduct({ id: uuidv4(), ...data }));
      toast(`${data.name} added successfully`);
    }
    onClose();
  };

  return (
    <BaseModal
      open={true}
      onClose={onClose}
      title={isEdit ? "Edit Product" : "Add Product"}
      description={isEdit ? "Update your product details" : "Fill in product details"}
      footer={
        <div className="flex justify-end gap-2 w-full">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>{isEdit ? "Update" : "Add"}</Button>
        </div>
      }
    >
      <form className="space-y-4">
        <div>
          <Label className="mb-2">Name</Label>
          <Input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-2">Price</Label>
          <Input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price cannot be negative" },
            })}
            className="w-full"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-2">Category</Label>
          <Input
            type="text"
            {...register("category", { required: "Category is required" })}
            className="w-full"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>
      </form>
    </BaseModal>
  );
}
