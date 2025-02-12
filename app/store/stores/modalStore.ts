import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ModalState = {
  modalType: "board" | "todo" | "idle";
  boardId: string | null;
};

export type ModalAction = {
  openBoardModal: (type: "board") => void;
  openTodoModal: (type: "todo", boardId: string) => void;
  closeModal: (type: "idle") => void;
  resetBoardId: () => void;
};

export const useModalStore = create<ModalState & ModalAction>()(
  immer((set) => ({
    modalType: "idle",
    boardId: null,
    openBoardModal: (type) =>
      set((state) => {
        state.modalType = type;
      }),
    openTodoModal: (type, boardId) =>
      set((state) => {
        state.modalType = type;
        state.boardId = boardId;
      }),

    closeModal: (type) =>
      set((state) => {
        state.modalType = type;
      }),
    resetBoardId: () => {
      set((state) => {
        state.boardId = null;
      });
    },
  })),
);
