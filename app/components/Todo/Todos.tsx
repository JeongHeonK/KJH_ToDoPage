import { useBoardsStore, useTodoStore } from "@/app/store";
import TodoItem from "./TodoItem";

interface TodosProps {
  boardId: string;
}

export default function Todos({ boardId }: TodosProps) {
  const boardArr = useTodos(boardId);
  return (
    <>
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
    </>
  );
}

const useTodos = (boardId: string) => {
  const board = useBoardsStore((state) => {
    if (state.boards) {
      return state.boards.find((board) => board.id === boardId);
    }
  });
  const todos = useTodoStore((state) => state.todos);
  const boardArr = board?.todoIds?.map((id) => ({ ...todos[id], id }));

  return boardArr;
};
