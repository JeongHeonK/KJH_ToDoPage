import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type ModalState = {
  isOpen: boolean;
};

export type ModalAction = {
  handleClose: () => void;
  handleOpen: () => void;
};

export const useModalStore = create<ModalState & ModalAction>()(
  persist(
    immer((set) => ({
      isOpen: false,
      handleClose: () =>
        set((state) => {
          state.isOpen = false;
        }),
      handleOpen: () =>
        set((state) => {
          state.isOpen = true;
        }),
    })),
    { name: "todos-storage" },
  ),
);
