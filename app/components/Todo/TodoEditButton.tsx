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
}

export default function TodoEditButton({
  todoId,
  boardId,
}: TodoEditButtonProps) {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const deleteTodoId = useBoardsStore((state) => state.deleteTodoId);

  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    deleteTodo(todoId);
    deleteTodoId(boardId, todoId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>···</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-10"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem className="justify-center" onClick={handleEdit}>
          수정
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center" onClick={handleDelete}>
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
