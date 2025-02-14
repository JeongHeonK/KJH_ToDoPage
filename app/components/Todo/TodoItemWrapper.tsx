import { PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoItemWrapper({
  children,
  todoId,
}: PropsWithChildren<{ todoId: string }>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todoId });

  const style = {
    zIndex: isDragging ? "100" : undefined,
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
    >
      {children}
    </div>
  );
}
