import { PropsWithChildren } from "react";
import { useTodoStore } from "@/app/store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoItemWrapper({
  children,
  todoId,
}: PropsWithChildren<{ todoId: string }>) {
  const editIsCompleted = useTodoStore((state) => state.editIsCompleted);

  const handleChangeIsCompleted = () => {
    editIsCompleted(todoId);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todoId });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      tabIndex={0}
      role="button"
      className="bg-white rounded-lg shadow-md py-2 px-3 flex items-center gap-2"
      onClick={handleChangeIsCompleted}
    >
      {children}
    </div>
  );
}
