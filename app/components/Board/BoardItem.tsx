import { useBoardsStore } from "@/app/store";
import { AnimatePresence } from "motion/react";

import TodoCreateButton from "../Todo/TodoCreateButton";
import BoardTitle from "./BoardTitle";
import BoardItemsWrapper from "./BoardItemsWrapper";
import Todos from "../Todo";

interface BoardItemProps {
  boardId: string;
}

export default function BoardItem({ boardId }: BoardItemProps) {
  const { isExisting, color } = useBoardItem(boardId);

  return (
    <AnimatePresence>
      {isExisting && (
        <BoardItemsWrapper color={color} boardId={boardId}>
          <BoardTitle boardId={boardId} />
          <Todos boardId={boardId} />
          <TodoCreateButton boardId={boardId} />
        </BoardItemsWrapper>
      )}
    </AnimatePresence>
  );
}

const useBoardItem = (boardId: string) => {
  const board = useBoardsStore((state) => {
    if (state.boards) {
      return state.boards.find((board) => board.id === boardId);
    }
  });
  const isExisting = board?.isExisting;
  const color = board?.color;

  return { isExisting, color };
};
