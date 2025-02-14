import { PropsWithChildren } from "react";
import * as motion from "motion/react-client";
import { usePreventDefault } from "@/app/hooks";
import { useBoardsStore } from "@/app/store";

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
      animate={boardWrapperOnAnimation}
      exit={boardWrapperInitialAnimation}
      transition={boardWrapperTransition}
      initial={boardWrapperInitialAnimation}
      className="border-2 min-w-[250px] h-fit rounded-lg px-2 pt-1 pb-5 bg-white flex flex-col gap-3"
    >
      {children}
    </motion.div>
  );
}

const boardWrapperStyle = (color?: string) => ({
  border: `2px solid ${color}`,
});

const boardWrapperInitialAnimation = { opacity: 0, scale: 0.7 };
const boardWrapperOnAnimation = { opacity: 1, scale: 1 };
const boardWrapperTransition = { duration: 0.4, ease: "easeInOut" };

const useBoardDrag = (boardId: string) => {
  const markDraggingValues = useBoardsStore(
    (state) => state.markDraggingValues,
  );
  const changeBoardIdIndex = useBoardsStore(
    (state) => state.changeBoardIdIndex,
  );
  const board = useBoardsStore((state) => {
    if (state.boards) {
      return state.boards.find((board) => board.id === boardId);
    }
  });
  const markDraggingType = useBoardsStore((state) => state.markDraggingType);
  const moveTodo = useBoardsStore((state) => state.moveTodo);

  const handleDragStart = () => {
    markDraggingValues(boardId);
    markDraggingType("board");
  };

  const handleDrop = () => {
    const { draggingType } = useBoardsStore.getState();
    const { draggingTodoId } = useBoardsStore.getState();
    const { draggingBoardId } = useBoardsStore.getState();

    const isDroppingOnEmptyBoard =
      draggingType === "todo" && board?.todoIds.length === 0;
    const isTodoEvent = draggingType === "todo";
    const hasValidValue = draggingBoardId && draggingTodoId;

    if (isDroppingOnEmptyBoard && hasValidValue) {
      moveTodo(draggingBoardId, boardId, draggingTodoId);
      return;
    }

    if (isTodoEvent) return;

    const startBoardId = useBoardsStore.getState().draggingBoardId;
    if (startBoardId) {
      changeBoardIdIndex(startBoardId, boardId);
    }
  };

  return { handleDrop, handleDragStart };
};
