"use client";

import { useModalStore } from "@/app/store";
import ModalBoardForm from "./ModalBoardForm";
import ModalWrapper from "./ModalWrapper";
import ModalTodoFrom from "./ModalTodoForm";

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
          <ModalTodoFrom />
        </ModalWrapper>
      );
    default:
      return null;
  }
}
