import { Button, Divider, Modal } from "../components";
import type { ConfirmModalProps } from "../../types";

interface Props extends ConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  cancelLabel?: string;
}

const ConfirmModal = ({
  title,
  description = "",
  icon,
  onCancel,
  onConfirm,
  confirmLabel,
  cancelLabel = "Cancel",
}: Props) => {
  return (
    <>
      <Modal>
        <div
          className="flex flex-row justify-center gap-4
        p-5"
        >
          <div
            className="w-[60px] h-[40px] rounded-[8px]
          bg-(--modal-icon-bg) flex justify-center items-center"
          >
            {icon}
          </div>
          <div className="flex flex-col gap-4 justify-start items-between">
            <h3 className="text-preset-3">{title}</h3>
            <span className="text-preset-5">{description}</span>
          </div>
        </div>
        <Divider />
        <div
          className="flex justify-end items-center gap-4            
        py-4 px-5 "
        >
          <Button
            variant="secondary"
            width="78px"
            height="41px"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="warning"
            width="110px"
            height="41px"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModal;
