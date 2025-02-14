import { PropsWithChildren } from "react";
import * as motion from "motion/react-client";
import { usePreventDefault } from "@/app/hooks";
import { useBoardsStore } from "@/app/store";

interface BoardItemWrapperProps {
  color: string;
  boardId: string;
}

export default function BoardItemWrapper({
  children,
  color,
  boardId,
}: PropsWithChildren<BoardItemWrapperProps>) {
  const markDraggingValues = useBoardsStore(
    (state) => state.markDraggingValues,
  );
  const changeBoardIdIndex = useBoardsStore(
    (state) => state.changeBoardIdIndex,
  );
  const markDraggingType = useBoardsStore((state) => state.markDraggingType);

  const handleDragStart = () => {
    markDraggingValues(boardId);
    markDraggingType("board");
  };

  const handleDrop = () => {
    const { draggingType } = useBoardsStore.getState();
    if (draggingType === "todo") return;

    const startBoardId = useBoardsStore.getState().draggingBoardId;
    if (startBoardId) {
      changeBoardIdIndex(startBoardId, boardId);
    }
  };

  return (
    <motion.div
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      onDragOver={usePreventDefault}
      style={{ border: `2px solid ${color}` }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="border-2 min-w-[250px] h-fit rounded-lg px-2 pt-1 pb-5 bg-white flex flex-col gap-3"
      draggable
    >
      {children}
    </motion.div>
  );
}
