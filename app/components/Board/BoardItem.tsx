import { useBoardsStore, useTodoStore } from "@/app/store";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
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

  return (
    <AnimatePresence>
      {board?.isExisting ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border-2 min-w-[250px] h-fit rounded-lg px-2 pt-1 pb-5 bg-white flex flex-col gap-3"
          style={{ border: `2px solid ${board?.color}` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          exit={{ opacity: 0, scale: 0 }}
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
