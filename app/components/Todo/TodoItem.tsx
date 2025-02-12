import { useEffect, useState } from "react";
import { TODO_DELAY } from "@/app/constants";

interface TodoItemProps {
  todo?: string;
  isCompleted: boolean;
}

export default function TodoItem({ todo, isCompleted }: TodoItemProps) {
  const [todoAnimation, setTodoAnimation] = useState(
    "opacity-0 -translate-x-7",
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTodoAnimation("");
    }, TODO_DELAY);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      className={`bg-white rounded-lg shadow-md py-2 px-3 ${todoAnimation} transition-all`}
    >
      <span className={`${isCompleted && "line-through"}`}>{todo}</span>
    </div>
  );
}
