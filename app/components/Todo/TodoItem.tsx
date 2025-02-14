import { useTodoStore } from "@/app/store";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { todoValidation } from "@/app/util/validation";
import { useToast } from "@/hooks/use-toast";
import TodoEditButton from "./TodoEditButton";
import TodoItemWrapper from "./TodoItemWrapper";

interface TodoItemProps {
  todoId: string;
}

export default function TodoItem({ todoId }: TodoItemProps) {
  const {
    todo,
    inputRef,
    hasError,
    isEditing,
    handleEditClick,
    handleEditKeyDown,
    handleClickEditing,
  } = useTodo(todoId);

  return (
    <TodoItemWrapper todoId={todoId}>
      {isEditing ? (
        <Input
          className={`border-none h-6 p-0 max-w-40 flex-1 focus-visible:ring-none text-wrap pl-2 ${hasError && "focus-visible:ring-1 focus-visible:ring-red-600"}`}
          ref={inputRef}
          onKeyDown={handleEditKeyDown}
        />
      ) : (
        <p
          className={`${todo?.isCompleted && "line-through"} text-wrap max-w-44 flex-1`}
        >
          {todo?.todo}
        </p>
      )}
      <TodoEditButton
        todoId={todoId}
        isEditing={isEditing}
        boardId={todo?.boardId}
        onEdit={handleEditClick}
        onClick={handleClickEditing}
      />
    </TodoItemWrapper>
  );
}

const useTodo = (todoId: string) => {
  const [hasError, setHasError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const todo = useTodoStore((state) => state.todos[todoId]);
  const editTodo = useTodoStore((state) => state.editTodo);
  const { toast } = useToast();

  const handleClickEditing = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleEditClick = useCallback(() => {
    if (!inputRef.current) return;
    const newTodo = inputRef.current.value;
    try {
      const response = todoValidation({ todo: newTodo });

      if (!response.success) throw new Error(response.error.message);
      editTodo(todoId, { ...todo, todo: newTodo });
    } catch (e) {
      const error = e as Error;
      const errorMessage = JSON.parse(error.message).at(0).message;
      toast({ title: errorMessage });
      inputRef.current.value = "";
      inputRef.current.focus();
      setHasError(true);
    }
  }, [editTodo, toast, todo, todoId]);

  const handleEditKeyDown = (e: KeyboardEvent) => {
    setHasError(false);
    e.stopPropagation();
    const isEscKey = e.key === "Escape";

    if (isEscKey) {
      setIsEditing(false);
    }

    if (e.key === "Enter" && inputRef.current) {
      const newTodo = inputRef.current.value;

      try {
        const response = todoValidation({ todo: newTodo });
        if (!response.success) throw new Error(response.error.message);
        editTodo(todoId, { ...todo, todo: newTodo });
        handleClickEditing();
      } catch (e) {
        const error = e as Error;
        const errorMessage = JSON.parse(error.message).at(0).message;
        toast({ title: errorMessage });
        inputRef.current.value = "";
        inputRef.current.focus();
        setHasError(true);
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isEditing]);

  return {
    todo,
    isEditing,
    inputRef,
    hasError,
    handleEditClick,
    handleEditKeyDown,
    handleClickEditing,
  };
};
