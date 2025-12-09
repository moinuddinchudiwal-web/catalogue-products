"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function BaseModal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: BaseModalProps) {
  const widthClasses = {
    sm: "!max-w-sm",
    md: "!max-w-md",
    lg: "!max-w-lg",
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`rounded-2xl p-6 shadow-lg ${widthClasses[size]} [&>button]:cursor-pointer`}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          {title && <DialogTitle className="text-xl">{title}</DialogTitle>}
          {description && (
            <DialogDescription className="text-gray-600">{description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-4">{children}</div>

        {footer && <DialogFooter className="mt-4">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
