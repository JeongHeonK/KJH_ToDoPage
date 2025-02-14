import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type Board = {
  id: string;
  title?: string;
  color: string;
  isExisting: boolean;
  todoIds: string[];
};

type BoardState = {
  boards: Board[] | null;
};

type BoardActions = {
  addBoard: (data: Board) => void;
  deleteBoard: (boardId: string) => void;
  editBoard: (data: Board) => void;
  deleteTodoId: (boardId: string, todoId: string) => void;
  addTodoId: (boardId: string, todoId: string) => void;
  changeExistingState: (boardId: string) => void;
  updateTodo: (boardId: string, dragTodoId: string, dropTodoId: string) => void;
};

export const useBoardsStore = create<BoardState & BoardActions>()(
  persist(
    immer((set) => ({
      boards: null,
      draggingIndex: null,
      draggingTodoId: null,
      draggingBoardId: null,
      addBoard: (data) =>
        set((state) => {
          if (state.boards) {
            state.boards.push(data);
          } else {
            state.boards = [data];
          }
        }),
      deleteBoard: (boardId) =>
        set((state) => {
          if (!state.boards) return;
          if (state.boards?.length === 1) {
            state.boards = null;
          }
          if (state.boards) {
            state.boards = state.boards.filter((item) => item.id !== boardId);
          }
        }),
      editBoard: (data) =>
        set((state) => {
          if (!state.boards) return;
          const targetIdx = state.boards.findIndex(
            (item) => item.id === data.id,
          );
          if (targetIdx !== -1) {
            state.boards[targetIdx] = data;
          }
        }),
      deleteTodoId: (boardId, todoId) =>
        set((state) => {
          if (!state.boards) return;
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
          if (!state.boards) return;
          const targetIdx = state.boards.findIndex(
            (item) => item.id === boardId,
          );
          if (targetIdx !== -1) {
            state.boards[targetIdx].todoIds.push(todoId);
          }
        }),
      changeExistingState: (boardId) =>
        set((state) => {
          if (!state.boards) return;
          const targetIdx = state.boards.findIndex(
            (board) => board.id === boardId,
          );
          if (targetIdx === -1) return;
          state.boards[targetIdx].isExisting = false;
        }),
      updateTodo: (boardId, dragTodoId, dropTodoId) =>
        set((state) => {
          if (state.boards) {
            const targetIdx = state.boards.findIndex(
              (board) => board.id === boardId,
            );
            const dragInx = state.boards[targetIdx].todoIds.findIndex(
              (todoId) => todoId === dragTodoId,
            );
            const dropInx = state.boards[targetIdx].todoIds.findIndex(
              (todoId) => todoId === dropTodoId,
            );

            const temp = state.boards[targetIdx].todoIds[dragInx];
            state.boards[targetIdx].todoIds[dragInx] =
              state.boards[targetIdx].todoIds[dropInx];
            state.boards[targetIdx].todoIds[dropInx] = temp;
          }
        }),
    })),
    { name: "boards-storage" },
  ),
);
