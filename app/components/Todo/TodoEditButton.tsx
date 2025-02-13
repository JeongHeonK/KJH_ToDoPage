import { useBoardsStore, useTodoStore } from "@/app/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { delay } from "@/app/util/index";
import { MouseEvent } from "react";
import { ANIMATION_DELAY } from "@/app/constants";

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
  const changeExistingState = useTodoStore(
    (state) => state.changeExistingState,
  );

  const handleClickEditing = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
    onEdit();
    onClick();
  };
  const handleDelete = async (e: MouseEvent) => {
    e.stopPropagation();
    changeExistingState(todoId);
    await delay(ANIMATION_DELAY);
    deleteTodo(todoId);
    deleteTodoId(boardId, todoId);
  };

  return (
    <>
      {isEditing ? (
        <button
          onClick={handleEdit}
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
