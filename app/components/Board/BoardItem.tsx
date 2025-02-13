import { useBoardsStore, useTodoStore } from "@/app/store";
import { AnimatePresence } from "motion/react";

import TodoItem from "../Todo";
import TodoCreateButton from "../Todo/TodoCreateButton";
import BoardTitle from "./BoardTitle";
import BoardItemWrapper from "./BoardItemWrapper";

interface BoardItemProps {
  boardId: string;
}

export default function BoardItem({ boardId }: BoardItemProps) {
  const board = useBoardsStore((state) =>
    state.boards.find((board) => board.id === boardId),
  );
  const todos = useTodoStore((state) => state.todos);
  const boardArr = board?.todoIds?.map((id) => ({ ...todos[id], id }));

  return (
    <AnimatePresence>
      {board?.isExisting && (
        <BoardItemWrapper color={board?.color}>
          <BoardTitle boardId={boardId} />
          <AnimatePresence>
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
          </AnimatePresence>
          <TodoCreateButton boardId={boardId} />
        </BoardItemWrapper>
      )}
    </AnimatePresence>
  );
}
