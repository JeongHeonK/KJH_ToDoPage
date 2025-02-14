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
  boards: Board[] | undefined;
  draggingTodoId: string | null;
  draggingBoardId: string | null;
  draggingIndex: number | null;
};

type BoardActions = {
  addBoard: (data: Board) => void;
  deleteBoard: (boardId: string) => void;
  editBoard: (data: Board) => void;
  deleteTodoId: (boardId: string, todoId: string) => void;
  addTodoId: (boardId: string, todoId: string) => void;
  changeExistingState: (boardId: string) => void;
  markDraggingValues: (boardId: string, todoId: string, index: number) => void;
  resetDraggingValues: () => void;
  updateTodo: (
    boardId: string,
    newBoardId: string,
    todoId: string,
    index: number,
    newIndex: number,
  ) => void;
};

export const useBoardsStore = create<BoardState & BoardActions>()(
  persist(
    immer((set) => ({
      boards: undefined,
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
            state.boards = undefined;
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
      markDraggingValues: (boardId, todoId, index) =>
        set((state) => {
          state.draggingIndex = index;
          state.draggingTodoId = todoId;
          state.draggingBoardId = boardId;
        }),
      resetDraggingValues: () =>
        set((state) => {
          state.draggingIndex = null;
          state.draggingTodoId = null;
          state.draggingBoardId = null;
        }),
      updateTodo: (boardId, newBoardId, todoId, index, newIndex) =>
        set((state) => {
          if (!state.boards) return;
          const sourceBoard = state.boards.find(
            (board) => board.id === boardId,
          );
          const targetBoard = state.boards.find(
            (board) => board.id === newBoardId,
          );

          if (!sourceBoard || !targetBoard) return;

          if (boardId === newBoardId) {
            // 같은 보드 내에서 위치 변경
            [sourceBoard.todoIds[index], sourceBoard.todoIds[newIndex]] = [
              sourceBoard.todoIds[newIndex],
              sourceBoard.todoIds[index],
            ];
          } else {
            // 다른 보드로 이동
            sourceBoard.todoIds.splice(index, 1);
            targetBoard.todoIds.splice(newIndex, 0, todoId);
          }
        }),
    })),
    { name: "boards-storage" },
  ),
);
