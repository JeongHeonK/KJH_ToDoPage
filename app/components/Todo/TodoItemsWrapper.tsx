import { PropsWithChildren } from "react";
import { AnimatePresence } from "motion/react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
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
      updateTodo(boardId, active.id.toString(), over?.id.toString());
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
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
