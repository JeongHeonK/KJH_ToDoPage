"use client";

import { useModalStore } from "../store";
import ModalForm from "./ModalForm";

export default function BoardModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const handleClose = useModalStore((state) => state.handleClose);
  return (
    <>
      {isOpen ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="모달 배경"
          onClick={handleClose}
          className="bg-black/40 fixed inset-0"
        >
          <ModalForm />
        </div>
      ) : null}
    </>
  );
}
