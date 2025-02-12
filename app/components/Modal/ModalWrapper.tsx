import { useModalStore } from "@/app/store";
import { PropsWithChildren } from "react";

export default function ModalWrapper({ children }: PropsWithChildren) {
  const closeModal = useModalStore((state) => state.closeModal);
  const handleClose = () => {
    closeModal("idle");
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="모달 배경"
      onClick={handleClose}
      className="bg-black/40 fixed inset-0 z-10"
    >
      {children}
    </div>
  );
}
