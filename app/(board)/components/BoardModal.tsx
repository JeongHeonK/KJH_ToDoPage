"use client";

import ModalWrapper from "@/app/components/ModalWrapper";

export default function BoardModal() {
  return (
    <div className="size-60 bg-white fixed top-32 left-0 right-0 mx-auto" />
  );
}

export const BoardCreationModal = ModalWrapper(BoardModal);
