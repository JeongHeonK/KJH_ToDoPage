import { useBoardsStore, useTodoStore } from "@/app/store";
import { delay } from "@/app/util/index";
import { MouseEvent, useCallback } from "react";
import { ANIMATION_DELAY } from "@/app/constants";
import TodoDropdown from "./TodoDropdown";
import TodoEditConfirmButton from "./TodoEditConfirmButton";

interface TodoEditButtonProps {
  todoId: string;
  boardId: string;
  isEditing: boolean;
  onEdit: () => void;
  onClick: () => void;
}

export default function TodoEditButton({
  todoId,
  onEdit,
  onClick,
  boardId,
  isEditing,
}: TodoEditButtonProps) {
  const { handleEdit, handleDelete, handleChangeEditingState } =
    useTodoEditButton({ todoId, onEdit, onClick, boardId });

  return (
    <>
      {isEditing ? (
        <TodoEditConfirmButton onEdit={handleEdit} />
      ) : (
        <TodoDropdown
          onDelete={handleDelete}
          onEdit={handleChangeEditingState}
        />
      )}
    </>
  );
}

type UseTodoEditButtonArgs = Omit<TodoEditButtonProps, "isEditing">;

const useTodoEditButton = (args: UseTodoEditButtonArgs) => {
  const { onClick, onEdit, todoId, boardId } = args;

  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const deleteTodoId = useBoardsStore((state) => state.deleteTodoId);
  const changeExistingState = useTodoStore(
    (state) => state.changeExistingState,
  );

  const handleChangeEditingState = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onClick();
    },
    [onClick],
  );

  const handleEdit = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onEdit();
      onClick();
    },
    [onClick, onEdit],
  );

  const handleDelete = useCallback(
    async (e: MouseEvent) => {
      e.stopPropagation();
      changeExistingState(todoId);
      await delay(ANIMATION_DELAY);
      deleteTodo(todoId);
      deleteTodoId(boardId, todoId);
    },
    [boardId, changeExistingState, deleteTodo, deleteTodoId, todoId],
  );

  return { handleEdit, handleDelete, handleChangeEditingState };
};
