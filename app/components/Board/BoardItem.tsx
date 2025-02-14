import { useBoardsStore } from "@/app/store";
import { AnimatePresence } from "motion/react";

import TodoCreateButton from "../Todo/TodoCreateButton";
import BoardTitle from "./BoardTitle";
import BoardItemWrapper from "./BoardItemWrapper";
import TodoItems from "../Todo";

interface BoardItemProps {
  boardId: string;
}

export default function BoardItem({ boardId }: BoardItemProps) {
  const board = useBoardsStore((state) => {
    if (state.boards) {
      return state.boards.find((board) => board.id === boardId);
    }
  });

  return (
    <AnimatePresence>
      {board?.isExisting && (
        <BoardItemWrapper color={board?.color}>
          <BoardTitle boardId={boardId} />
          <TodoItems boardId={boardId} />
          <TodoCreateButton boardId={boardId} />
        </BoardItemWrapper>
      )}
    </AnimatePresence>
  );
}
