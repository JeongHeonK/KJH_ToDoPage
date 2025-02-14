import { useBoardsStore, useTodoStore } from "@/app/store";
import { AnimatePresence } from "motion/react";

import TodoItem from "../Todo";
import TodoCreateButton from "../Todo/TodoCreateButton";
import BoardTitle from "./BoardTitle";
import BoardItemsWrapper from "./BoardItemsWrapper";

interface BoardItemProps {
  boardId: string;
}

export default function BoardItem({ boardId }: BoardItemProps) {
  const { boardArr, isExisting, color } = useBoardItem(boardId);

  return (
    <AnimatePresence>
      {isExisting && (
        <BoardItemsWrapper color={color} boardId={boardId}>
          <BoardTitle boardId={boardId} />
          {boardArr?.map(
            (item, index) =>
              item.isExisting && (
                <TodoItem
                  key={item.id}
                  todoId={item.id}
                  boardId={boardId}
                  index={index}
                />
              ),
          )}
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
  const todos = useTodoStore((state) => state.todos);
  const boardArr = board?.todoIds?.map((id) => ({ ...todos[id], id }));
  const isExisting = board?.isExisting;
  const color = board?.color;

  return { boardArr, isExisting, color };
};
