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
  boards?: Board[];
  draggingType?: "board" | "todo";
  draggingTodoId?: string;
  draggingBoardId?: string;
  draggingIndex?: number;
};

type BoardActions = {
  addBoard: (data: Board) => void;
  deleteBoard: (boardId: string) => void;
  editBoard: (data: Board) => void;
  deleteTodoId: (boardId: string, todoId: string) => void;
  addTodoId: (boardId: string, todoId: string) => void;
  changeExistingState: (boardId: string) => void;
  resetDraggingValues: () => void;
  changeBoardIdIndex: (boarId: string, newBoardId: string) => void;
  markDraggingType: (type?: "board" | "todo") => void;
  moveTodo: (boardId: string, newBoardId: string, todoId: string) => void;
  markDraggingValues: (
    boardId?: string,
    todoId?: string,
    index?: number,
  ) => void;
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
      markDraggingType: (type) =>
        set((state) => {
          state.draggingType = type;
        }),
      markDraggingValues: (boardId, todoId, index) =>
        set((state) => {
          state.draggingIndex = index;
          state.draggingTodoId = todoId;
          state.draggingBoardId = boardId;
        }),
      resetDraggingValues: () =>
        set((state) => {
          state.draggingIndex = undefined;
          state.draggingTodoId = undefined;
          state.draggingBoardId = undefined;
        }),
      changeBoardIdIndex: (boardId, newBoardId) =>
        set((state) => {
          if (!state.boards) return;
          const index = state.boards.findIndex((board) => board.id === boardId);
          const newIndex = state.boards.findIndex(
            (board) => board.id === newBoardId,
          );
          [state.boards[index], state.boards[newIndex]] = [
            state.boards[newIndex],
            state.boards[index],
          ];
        }),
      moveTodo: (boardId, newBoardId, todoId) =>
        set((state) => {
          if (!state.boards) return;

          const index = state.boards.findIndex((board) => board.id === boardId);
          const newIndex = state.boards.findIndex(
            (board) => board.id === newBoardId,
          );

          state.boards[index].todoIds = state.boards[index].todoIds.filter(
            (id) => id !== todoId,
          );
          state.boards[newIndex].todoIds.push(todoId);
        }),
      updateTodo: (boardId, newBoardId, todoId, index, newIndex) =>
        set((state) => {
          if (!state.boards) return;
          const isSameBoard = boardId === newBoardId;

          const currentBoard = state.boards.find(
            (board) => board.id === boardId,
          );
          const targetBoard = state.boards.find(
            (board) => board.id === newBoardId,
          );

          if (!currentBoard || !targetBoard) return;

          if (isSameBoard) {
            [currentBoard.todoIds[index], currentBoard.todoIds[newIndex]] = [
              currentBoard.todoIds[newIndex],
              currentBoard.todoIds[index],
            ];
          } else {
            currentBoard.todoIds.splice(index, 1);
            targetBoard.todoIds.splice(newIndex, 0, todoId);
          }
        }),
    })),
    { name: "boards-storage" },
  ),
);
