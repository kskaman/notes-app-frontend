import type { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-(--modal-bg) rounded-[12px] w-[343px] h-[193px] lg:w-[440px] lg:h-[175px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
