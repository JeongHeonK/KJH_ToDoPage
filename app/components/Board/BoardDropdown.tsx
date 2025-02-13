import { usePreventDefault } from "@/app/hooks";
import { useModalStore } from "@/app/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MouseEvent } from "react";

interface BoardDropdownProps {
  color?: string;
  boardId: string;
}

export default function BoardDropdown({ color, boardId }: BoardDropdownProps) {
  const openBoardModal = useModalStore((state) => state.openBoardModal);

  const handleClickOpenModal = (e: MouseEvent) => {
    e.stopPropagation();
    openBoardModal("board", boardId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger style={{ color }}>···</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-10"
        onCloseAutoFocus={usePreventDefault}
      >
        <DropdownMenuItem
          className="justify-center"
          onClick={handleClickOpenModal}
        >
          수정
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
