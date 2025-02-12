import { StateCreator } from "zustand";

type Board = {
  id: string;
  title: string;
  color: string;
};

export type BoardState = {
  boards: Board[];
};

export type BoardAction = {
  addBoard: (data: Board) => void;
  deleteBoard: (id: string) => void;
  editBoard: (data: Board) => void;
};

export const createBoardsSlice: StateCreator<BoardState & BoardAction> = (
  set,
) => ({
  boards: [],
  addBoard: (data) =>
    set((state) => {
      const newBoards = [...state.boards, data];
      return { ...state, boards: newBoards };
    }),
  deleteBoard: (id) =>
    set((state) => {
      const newBoards = state.boards.filter((item) => item.id !== id);
      return { ...state, boards: newBoards };
    }),
  editBoard: (data) =>
    set((state) => {
      const targetIdx = state.boards.findIndex((item) => item.id === data.id);
      const newBoards = [
        ...state.boards.slice(0, targetIdx),
        data,
        ...state.boards.slice(targetIdx + 1),
      ];
      return { ...state, boards: newBoards };
    }),
});
