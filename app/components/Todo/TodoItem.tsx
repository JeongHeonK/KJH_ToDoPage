// import { AnimatePresence } from "motion/react";
import { useTodoStore } from "@/app/store";
import * as motion from "motion/react-client";
import { MouseEvent } from "react";

interface TodoItemProps {
  todoId: string;
}

export default function TodoItem({ todoId }: TodoItemProps) {
  const todo = useTodoStore((state) => state.todos[todoId]);
  const editIsCompleted = useTodoStore((state) => state.editIsCompleted);

  const handleChangeIsCompleted = () => {
    editIsCompleted(todoId);
  };
  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.2,
        duration: 0.3,
        ease: "linear",
      }}
      className="bg-white rounded-lg shadow-md py-2 px-3 flex items-center"
      onClick={handleChangeIsCompleted}
      draggable
    >
      <p className={`${todo.isCompleted && "line-through"} flex-1`}>
        {todo.todo}
      </p>
      <button onClick={handleEdit} className="p-3 text-sm">
        edit
      </button>
    </motion.div>
  );
}
