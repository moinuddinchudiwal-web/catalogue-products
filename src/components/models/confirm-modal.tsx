"use client";

import { Button } from "@/components/ui/button";
import { BaseModal } from "./base-modal";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({
  open,
  title = "Confirm action?",
  description = "This action can lead to this circumstance.",
  confirmText = "Save",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <BaseModal
      open={open}
      onClose={onCancel}
      title={title}
      description={description}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>

          <Button className="bg-black text-white" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      }
    />
  );
}
