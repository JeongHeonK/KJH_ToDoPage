import { PropsWithChildren } from "react";
import { useTodoStore } from "@/app/store";

interface TodoItemWrapperProps {
  todoId: string;
  index: number;
}

export default function TodoItemWrapper({
  children,
  todoId,
  index,
}: PropsWithChildren<TodoItemWrapperProps>) {
  const editIsCompleted = useTodoStore((state) => state.editIsCompleted);

  const handleChangeIsCompleted = () => {
    editIsCompleted(todoId);
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className={`bg-white rounded-lg shadow-md py-2 px-3 flex items-center gap-2 ${index === 0 && "-mt-3"}`}
      onClick={handleChangeIsCompleted}
    >
      {children}
    </div>
  );
}
