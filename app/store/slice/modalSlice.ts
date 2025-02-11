import { StateCreator } from "zustand";

export type ModalState = {
  isOpen: boolean;
};

export type ModalAction = {
  handleClose: () => void;
  handleOpen: () => void;
};

export const createModalSlice: StateCreator<ModalState & ModalAction> = (
  set,
) => ({
  isOpen: false,
  handleClose: () => set(() => ({ isOpen: false })),
  handleOpen: () => set(() => ({ isOpen: true })),
});
