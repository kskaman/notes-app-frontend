import { Button, Divider, Modal } from "../components";
import type { BaseModalProps } from "../../types";

// Extended props for more complex modal actions
interface ExtendedBaseModalProps extends BaseModalProps {
  actions?: Array<{
    label: string;
    variant?: "primary" | "secondary" | "warning" | "outlined";
    onClick: () => void;
    width?: string;
  }>;
}

const BaseModal = ({ title, children, onClose, actions = [], icon }: ExtendedBaseModalProps) => {
  const defaultActions = actions.length === 0 ? [
    { label: "Close", variant: "secondary" as const, onClick: onClose, width: "78px" }
  ] : actions;

  return (
    <Modal>
      {/* Header Section */}
      {(title || icon) && (
        <div className="flex flex-row justify-center gap-4 p-5">
          {icon && (
            <div className="w-[60px] h-[40px] rounded-[8px] bg-(--modal-icon-bg) flex justify-center items-center">
              {icon}
            </div>
          )}
          {title && (
            <div className="flex flex-col gap-4 justify-start items-between">
              <h3 className="text-preset-3">{title}</h3>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col justify-center gap-4 p-5">
        {children}
      </div>

      {/* Actions Section */}
      <Divider />
      <div className="flex justify-end items-center gap-4 py-4 px-5">
        {defaultActions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || "primary"}
            width={action.width || "110px"}
            height="41px"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </Modal>
  );
};

export default BaseModal;
