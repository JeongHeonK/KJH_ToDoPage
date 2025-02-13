import { PropsWithChildren } from "react";
import * as motion from "motion/react-client";
import { useTodoStore } from "@/app/store";

export default function TodoItemWrapper({
  children,
  todoId,
}: PropsWithChildren<{ todoId: string }>) {
  const editIsCompleted = useTodoStore((state) => state.editIsCompleted);

  const handleChangeIsCompleted = () => {
    editIsCompleted(todoId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        delay: 0.2,
        duration: 0.3,
        ease: "linear",
      }}
      className="bg-white rounded-lg shadow-md py-2 px-3 flex items-center gap-2"
      onClick={handleChangeIsCompleted}
      draggable
    >
      {children}
    </motion.div>
  );
}
