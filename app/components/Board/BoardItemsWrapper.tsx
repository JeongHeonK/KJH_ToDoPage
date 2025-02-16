import { PropsWithChildren } from "react";
import * as motion from "motion/react-client";
import { usePreventDefault } from "@/app/hooks";
import { useBoardsStore } from "@/app/store";
import {
  BOARD_WRAPPER_ANIMATION_STATE,
  BOARD_WRAPPER_INITIAL_STATE,
  BOARD_WRAPPER_TRANSITION,
} from "@/app/constants";

interface BoardItemWrapperProps {
  color?: string;
  boardId: string;
}

export default function BoardItemWrapper({
  children,
  color,
  boardId,
}: PropsWithChildren<BoardItemWrapperProps>) {
  const { handleDrop, handleDragStart } = useBoardDrag(boardId);

  return (
    <motion.div
      draggable
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      onDragOver={usePreventDefault}
      style={boardWrapperStyle(color)}
      exit={BOARD_WRAPPER_INITIAL_STATE}
      transition={BOARD_WRAPPER_TRANSITION}
      initial={BOARD_WRAPPER_INITIAL_STATE}
      animate={BOARD_WRAPPER_ANIMATION_STATE}
      className="border-2 min-w-[250px] h-fit rounded-lg px-2 pt-1 pb-5 bg-white flex flex-col gap-3"
    >
      {children}
    </motion.div>
  );
}

const boardWrapperStyle = (color?: string) => ({
  border: `2px solid ${color}`,
});

const useBoardDrag = (boardId: string) => {
  const markDraggingValues = useBoardsStore(
    (state) => state.markDraggingValues,
  );
  const changeBoardIdIndex = useBoardsStore(
    (state) => state.changeBoardIdIndex,
  );
  const moveTodo = useBoardsStore((state) => state.moveTodo);
  const markDraggingType = useBoardsStore((state) => state.markDraggingType);
  const resetDraggingValues = useBoardsStore(
    (state) => state.resetDraggingValues,
  );

  const handleDragStart = () => {
    markDraggingValues(boardId);
    markDraggingType("board");
  };

  const handleDrop = () => {
    const { draggingType } = useBoardsStore.getState();
    const { draggingTodoId } = useBoardsStore.getState();
    const { draggingBoardId } = useBoardsStore.getState();
    const isDraggingTodo = draggingType === "todo";
    const hasValidValue = draggingBoardId && draggingTodoId;

    if (isDraggingTodo && hasValidValue) {
      moveTodo(draggingBoardId, boardId, draggingTodoId);
      resetDraggingValues();
      return;
    }

    const startBoardId = useBoardsStore.getState().draggingBoardId;

    if (startBoardId) {
      changeBoardIdIndex(startBoardId, boardId);
      resetDraggingValues();
    }
  };

  return { handleDrop, handleDragStart };
};
