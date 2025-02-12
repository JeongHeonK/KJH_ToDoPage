import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Todo = {
  boardId: string;
  work: string;
  isCompleted: boolean;
};

export type TodoState = {
  todos: Record<string, Todo>;
};

export type TodoActions = {
  deleteTodo: (todoId: string) => void;
  editTodo: (todoId: string, data: Todo) => void;
  addTodo: (todoId: string, data: Todo) => void;
};

export const useTodoStore = create<TodoState & TodoActions>()(
  immer((set) => ({
    todos: {},
    deleteTodo: (id) =>
      set((state) => {
        delete state.todos[id];
      }),
    editTodo: (todoId, data) =>
      set((state) => {
        state.todos[todoId].boardId = data.boardId;
        state.todos[todoId].isCompleted = data.isCompleted;
        state.todos[todoId].work = data.work;
      }),
    addTodo: (todoId, data) =>
      set((state) => {
        state.todos[todoId] = data;
      }),
  })),
);
