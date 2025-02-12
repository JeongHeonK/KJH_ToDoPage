"use client";

import { useModalStore } from "@/app/store";
import ModalBoardForm from "./ModalBoardForm";
import ModalWrapper from "./ModalWrapper";

export default function Modal() {
  const modalType = useModalStore((state) => state.modalType);

  switch (modalType) {
    case "board":
      return (
        <ModalWrapper>
          <ModalBoardForm />
        </ModalWrapper>
      );
    case "todo":
      return (
        <ModalWrapper>
          <div className="size-40 bg-white" />
        </ModalWrapper>
      );
    default:
      return null;
  }
}
