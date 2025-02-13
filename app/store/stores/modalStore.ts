import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ModalState = {
  modalType: "board" | "todo" | "idle";
  boardId: string | null;
};

export type ModalAction = {
  openBoardModal: (type: "board", boardId?: string) => void;
  openTodoModal: (type: "todo", boardId: string) => void;
  closeModal: (type: "idle") => void;
};

export const useModalStore = create<ModalState & ModalAction>()(
  immer((set) => ({
    modalType: "idle",
    boardId: null,
    openBoardModal: (type, boardId) =>
      set((state) => {
        state.modalType = type;
        if (boardId) {
          state.boardId = boardId;
        }
      }),
    openTodoModal: (type, boardId) =>
      set((state) => {
        state.modalType = type;
        state.boardId = boardId;
      }),
    closeModal: (type) =>
      set((state) => {
        state.modalType = type;
        state.boardId = null;
      }),
  })),
);
