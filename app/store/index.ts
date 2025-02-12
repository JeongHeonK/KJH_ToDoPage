import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ModalState, ModalAction, createModalSlice } from "./slice/modalSlice";
import { BoardState, BoardAction, createBoardsSlice } from "./slice/boardSlice";

export const useModalStore = create<ModalState & ModalAction>()((...args) => ({
  ...createModalSlice(...args),
}));

export const useBoardsStore = create<BoardState & BoardAction>()(
  persist(
    (...args) => ({
      ...createBoardsSlice(...args),
    }),
    { name: "boards-storage" },
  ),
);
