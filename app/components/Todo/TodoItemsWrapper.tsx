import { PropsWithChildren } from "react";
import { AnimatePresence } from "motion/react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useBoardsStore } from "@/app/store";

export default function TodoItemsWrapper({
  children,
  boardId,
}: PropsWithChildren<{ boardId: string }>) {
  const updateTodo = useBoardsStore((state) => state.updateTodo);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;
    if (over && over.id) {
      console.log(active.id, over.id);
      console.log("실행");
      updateTodo(boardId, active.id.toString(), over?.id.toString());
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <AnimatePresence>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        {children}
      </DndContext>
    </AnimatePresence>
  );
}
