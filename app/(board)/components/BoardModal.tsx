"use client";

import { useModalStore } from "@/app/store";
import BoardModalInner from "./BoardModalInner";

export default function BoardModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const handleClose = useModalStore((state) => state.handleClose);
  return (
    <>
      {isOpen ? (
        <div
          tabIndex={0}
          role="button"
          onClick={handleClose}
          className="bg-black/60 fixed top-0 left-0 right-0 bottom-0 z-30"
        >
          <BoardModalInner />
        </div>
      ) : null}
    </>
  );
}
