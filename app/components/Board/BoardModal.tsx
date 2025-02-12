"use client";

import { useModalStore } from "../../store";
import ModalForm from "../ModalForm";

export default function BoardModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const modalActions = useModalStore((state) => state.actions);
  return (
    <>
      {isOpen ? (
        <div
          role="button"
          tabIndex={0}
          aria-label="모달 배경"
          onClick={modalActions.handleClose}
          className="bg-black/40 fixed inset-0 z-10"
        >
          <ModalForm />
        </div>
      ) : null}
    </>
  );
}
