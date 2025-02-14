import { useBoardsStore, useTodoStore } from "@/app/store";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TodoItem from "./TodoItem";
import TodoItemsWrapper from "./TodoItemsWrapper";

interface TodoItemsProps {
  boardId: string;
}

export default function TodoItems({ boardId }: TodoItemsProps) {
  const board = useBoardsStore((state) => {
    if (state.boards) {
      return state.boards.find((board) => board.id === boardId);
    }
  });
  const todos = useTodoStore((state) => state.todos);
  const todoArr = board?.todoIds?.map((id) => ({ ...todos[id], id }));

  return (
    <TodoItemsWrapper boardId={boardId}>
      {todoArr && (
        <SortableContext items={todoArr} strategy={verticalListSortingStrategy}>
          {todoArr?.map(
            (item) =>
              item.isExisting && <TodoItem key={item.id} todoId={item.id} />,
          )}
        </SortableContext>
      )}
    </TodoItemsWrapper>
  );
}
