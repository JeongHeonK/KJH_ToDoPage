import { PropsWithChildren } from "react";
import { useTodoStore } from "@/app/store";

export default function TodoItemWrapper({
  children,
  todoId,
}: PropsWithChildren<{ todoId: string }>) {
  const editIsCompleted = useTodoStore((state) => state.editIsCompleted);

  const handleChangeIsCompleted = () => {
    editIsCompleted(todoId);
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className="bg-white rounded-lg shadow-md py-2 px-3 flex items-center gap-2"
      onClick={handleChangeIsCompleted}
    >
      {children}
    </div>
  );
}
