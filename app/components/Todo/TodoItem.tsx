interface TodoItemProps {
  todo?: string;
  isCompleted: boolean;
}

export default function TodoItem({ todo, isCompleted }: TodoItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md py-2 px-3">
      <span className={`${isCompleted && "line-through"}`}>{todo}</span>
    </div>
  );
}
