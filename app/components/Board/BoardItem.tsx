import { useBoardsStore, useTodoStore } from "@/app/store";
import { AnimatePresence } from "motion/react";
import TodoItem from "../Todo/TodoItem";
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
  const boardTodos = board?.todoIds?.map((id) => ({ ...todos[id], id }));

  return (
    <AnimatePresence>
      {board?.isExisting && (
        <BoardItemWrapper color={board?.color}>
          <BoardTitle boardId={boardId} />
          <AnimatePresence>
            {boardTodos?.map(
              (item) =>
                item.isExisting && <TodoItem key={item.id} todoId={item.id} />,
            )}
          </AnimatePresence>
          <TodoCreateButton boardId={boardId} />
        </BoardItemWrapper>
      )}
    </AnimatePresence>
  );
}
