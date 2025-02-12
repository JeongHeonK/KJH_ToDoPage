import { useTodoStore } from "@/app/store";
import TodoItem from "../Todo/TodoItem";
import TodoCreateButton from "../Todo/TodoCreateButton";
import BoardTitle from "./BoardTitle";

interface BoardItemProps {
  title?: string;
  color: string;
  boardId: string;
  todoIds: string[];
}

export default function BoardItem({
  boardId,
  title,
  color,
  todoIds,
}: BoardItemProps) {
  const todos = useTodoStore((state) => state.todos);
  const boardTodos = todoIds?.map((id) => ({ ...todos[id], id }));
  console.log(boardId);
  return (
    <div
      className="border-2 min-w-[250px] h-fit rounded-lg px-2 pt-1 pb-5 bg-white flex flex-col gap-3"
      style={{ border: `2px solid ${color}` }}
      draggable
    >
      <BoardTitle title={title} color={color} />
      {boardTodos?.map((item) => (
        <TodoItem
          key={item.id}
          todo={item.todo}
          isCompleted={item.isCompleted}
        />
      ))}
      <TodoCreateButton color={color} boardId={boardId} />
    </div>
  );
}
