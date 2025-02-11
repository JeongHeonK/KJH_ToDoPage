"use client";

import { useModalStore } from "../store";

export default function BoardModal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const handleClose = useModalStore((state) => state.handleClose);
  return (
    <>
      {isOpen ? (
        <div
          role="button"
          tabIndex={0}
          onClick={handleClose}
          className="bg-black/40 fixed inset-0"
        >
          modal
        </div>
      ) : null}
    </>
  );
}
