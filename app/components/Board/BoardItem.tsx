import Todo from "../Todo";
import BoardTitle from "./BoardTitle";

interface BoardItemProps {
  title?: string;
  color: string;
  id: string;
}

export default function BoardItem({ id, title, color }: BoardItemProps) {
  console.log(id);
  return (
    <div
      className="border-2 min-w-[250px] h-fit rounded-lg px-2 pt-1 pb-5 bg-white flex flex-col gap-3"
      style={{ border: `2px solid ${color}` }}
      draggable
    >
      <BoardTitle title={title} color={color} />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
      <Todo />
    </div>
  );
}
