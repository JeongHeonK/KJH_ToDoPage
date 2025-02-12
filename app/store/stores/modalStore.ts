import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ModalState = {
  modalType: "board" | "todo" | "idle";
};

export type ModalAction = {
  openModal: (type: "todo" | "board") => void;
  closeModal: (type: "idle") => void;
};

export const useModalStore = create<ModalState & ModalAction>()(
  immer((set) => ({
    modalType: "idle",
    closeModal: (type) =>
      set((state) => {
        state.modalType = type;
      }),
    openModal: (type) =>
      set((state) => {
        state.modalType = type;
      }),
  })),
);
