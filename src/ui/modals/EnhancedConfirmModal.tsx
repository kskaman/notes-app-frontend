import type { ReactNode } from "react";
import BaseModal from "./BaseModal";

interface EnhancedConfirmModalProps {
  title: string;
  description?: string;
  icon: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: "warning" | "primary";
}

const EnhancedConfirmModal = ({
  title,
  description,
  icon,
  onCancel,
  onConfirm,
  confirmLabel,
  cancelLabel = "Cancel",
  variant = "warning"
}: EnhancedConfirmModalProps) => {
  const actions = [
    {
      label: cancelLabel,
      variant: "secondary" as const,
      onClick: onCancel,
      width: "78px"
    },
    {
      label: confirmLabel,
      variant,
      onClick: onConfirm,
      width: "110px"
    }
  ];

  return (
    <BaseModal
      title={title}
      icon={icon}
      actions={actions}
      onClose={onCancel}
    >
      {description && (
        <span className="text-preset-5">{description}</span>
      )}
    </BaseModal>
  );
};

export default EnhancedConfirmModal;
