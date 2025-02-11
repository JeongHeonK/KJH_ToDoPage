import { create } from "zustand";
import { ModalState, ModalAction, createModalSlice } from "./slice/modalSlice";

export const useModalStore = create<ModalState & ModalAction>()((...args) => ({
  ...createModalSlice(...args),
}));
