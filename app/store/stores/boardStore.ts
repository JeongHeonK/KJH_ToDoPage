import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type Board = {
  id: string;
  title?: string;
  color: string;
  todoIds: string[];
};

type BoardState = {
  boards: Board[];
};

type BoardActions = {
  addBoard: (data: Board) => void;
  deleteBoard: (id: string) => void;
  editBoard: (data: Board) => void;
  deleteTodoId: (boardId: string, todoId: string) => void;
  addTodoId: (boardId: string, todoId: string) => void;
};

export const useBoardsStore = create<BoardState & BoardActions>()(
  persist(
    immer((set) => ({
      boards: [],
      addBoard: (data) =>
        set((state) => {
          state.boards.push(data);
        }),
      deleteBoard: (id) =>
        set((state) => {
          state.boards = state.boards.filter((item) => item.id !== id);
        }),
      editBoard: (data) =>
        set((state) => {
          const targetIdx = state.boards.findIndex(
            (item) => item.id === data.id,
          );
          if (targetIdx !== -1) {
            state.boards[targetIdx] = data;
          }
        }),
      deleteTodoId: (boardId, todoId) =>
        set((state) => {
          const targetIdx = state.boards.findIndex(
            (item) => item.id === boardId,
          );
          if (targetIdx !== -1) {
            state.boards[targetIdx].todoIds = state.boards[
              targetIdx
            ].todoIds.filter((item) => item !== todoId);
          }
        }),
      addTodoId: (boardId, todoId) =>
        set((state) => {
          const targetIdx = state.boards.findIndex(
            (item) => item.id === boardId,
          );
          if (targetIdx !== -1) {
            state.boards[targetIdx].todoIds.push(todoId);
          }
        }),
    })),
    { name: "boards-storage" },
  ),
);
