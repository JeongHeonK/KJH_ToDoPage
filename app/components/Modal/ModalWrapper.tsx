import { useModalStore } from "@/app/store";
import { KeyboardEvent, PropsWithChildren } from "react";

export default function ModalWrapper({ children }: PropsWithChildren) {
  const { handleClose, handleKeyDown } = useModalWrapper();

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="모달 배경"
      onClick={handleClose}
      className="bg-black/40 fixed inset-0 z-10"
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

const useModalWrapper = () => {
  const closeModal = useModalStore((state) => state.closeModal);

  const handleClose = () => {
    closeModal("idle");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const isEscKey = e.key === "Escape";

    if (isEscKey) {
      closeModal("idle");
    }
  };

  return { handleClose, handleKeyDown };
};
