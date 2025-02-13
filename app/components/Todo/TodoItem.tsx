// import { AnimatePresence } from "motion/react";
import { useTodoStore } from "@/app/store";
import TodoEditButton from "./TodoEditButton";
import TodoItemWrapper from "./TodoItemWrapper";

interface TodoItemProps {
  todoId: string;
}

export default function TodoItem({ todoId }: TodoItemProps) {
  const todo = useTodoStore((state) => state.todos[todoId]);

  return (
    <TodoItemWrapper todoId={todoId}>
      <p
        className={`${todo.isCompleted && "line-through"} text-wrap max-w-44 flex-1`}
      >
        {todo.todo}
      </p>
      <TodoEditButton todoId={todoId} boardId={todo.boardId} />
    </TodoItemWrapper>
  );
}
