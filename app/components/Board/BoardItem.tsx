import { useEffect, useState } from "react";
import { useBoardsStore, useTodoStore } from "@/app/store";
import { BOARD_DELAY } from "@/app/constants";
import TodoItem from "../Todo/TodoItem";
import TodoCreateButton from "../Todo/TodoCreateButton";
import BoardTitle from "./BoardTitle";

interface BoardItemProps {
  boardId: string;
}

export default function BoardItem({ boardId }: BoardItemProps) {
  const board = useBoardsStore((state) =>
    state.boards.find((board) => board.id === boardId),
  );
  const todos = useTodoStore((state) => state.todos);
  const boardTodos = board?.todoIds?.map((id) => ({ ...todos[id], id }));
  const boardAnimation = useBoardAnimation();

  return (
    <div
      className={`border-2 min-w-[250px] h-fit rounded-lg px-2 pt-1 pb-5 bg-white flex flex-col gap-3 ${boardAnimation} transition-all`}
      style={{ border: `2px solid ${board?.color}` }}
      draggable
    >
      <BoardTitle boardId={boardId} />
      {boardTodos?.map((item) => (
        <TodoItem
          key={item.id}
          todo={item.todo}
          isCompleted={item.isCompleted}
        />
      ))}
      <TodoCreateButton boardId={boardId} />
    </div>
  );
}

const useBoardAnimation = () => {
  const [boardAnimation, setBoardAnimation] = useState(
    "opacity-0 translate-y-4",
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setBoardAnimation("");
    }, BOARD_DELAY);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return boardAnimation;
};
