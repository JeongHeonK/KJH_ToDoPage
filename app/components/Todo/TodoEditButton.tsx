import { useBoardsStore, useTodoStore } from "@/app/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MouseEvent } from "react";

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
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const deleteTodoId = useBoardsStore((state) => state.deleteTodoId);

  const handleClickEditing = (e: MouseEvent) => {
    e.stopPropagation();
    onEdit();
    onClick();
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    deleteTodo(todoId);
    deleteTodoId(boardId, todoId);
  };

  return (
    <>
      {isEditing ? (
        <button
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            onClick();
          }}
          className="text-[12px] px-2 py-1 rounded-md bg-green-700 text-white"
        >
          수정
        </button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>···</DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-10"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuItem
              className="justify-center"
              onClick={handleClickEditing}
            >
              수정
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center" onClick={handleDelete}>
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
