import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type Todo = {
  boardId: string;
  todo?: string | undefined;
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
  persist(
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
          state.todos[todoId].todo = data.todo;
        }),
      addTodo: (todoId, data) =>
        set((state) => {
          state.todos[todoId] = data;
        }),
    })),
    { name: "todo-storage" },
  ),
);
