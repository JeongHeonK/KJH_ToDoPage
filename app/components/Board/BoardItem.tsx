import { useBoardsStore, useTodoStore } from "@/app/store";
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
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TodoItem from "../Todo";
import TodoCreateButton from "../Todo/TodoCreateButton";
import BoardTitle from "./BoardTitle";
import BoardItemWrapper from "./BoardItemWrapper";

interface BoardItemProps {
  boardId: string;
}

export default function BoardItem({ boardId }: BoardItemProps) {
  const board = useBoardsStore((state) => {
    if (state.boards) {
      return state.boards.find((board) => board.id === boardId);
    }
  });
  const todos = useTodoStore((state) => state.todos);
  const todoArr = board?.todoIds?.map((id) => ({ ...todos[id], id }));
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
      {board?.isExisting && (
        <BoardItemWrapper color={board?.color}>
          <BoardTitle boardId={boardId} />
          <AnimatePresence>
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCenter}
            >
              {todoArr && (
                <SortableContext
                  items={todoArr}
                  strategy={verticalListSortingStrategy}
                >
                  {todoArr?.map(
                    (item) =>
                      item.isExisting && (
                        <TodoItem key={item.id} todoId={item.id} />
                      ),
                  )}
                </SortableContext>
              )}
            </DndContext>
          </AnimatePresence>
          <TodoCreateButton boardId={boardId} />
        </BoardItemWrapper>
      )}
    </AnimatePresence>
  );
}
