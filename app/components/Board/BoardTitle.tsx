import { Badge } from "@/components/ui/badge";
import { useBoardsStore, useModalStore, useTodoStore } from "@/app/store";
import { delay } from "@/app/util";
import { ANIMATION_DELAY } from "@/app/constants";
import { MouseEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FlexSpace from "../FlexSpace";

interface BoardTitleProps {
  boardId: string;
}

export default function BoardTitle({ boardId }: BoardTitleProps) {
  const board = useBoardsStore((state) =>
    state.boards.find((board) => board.id === boardId),
  );
  const deleteBoard = useBoardsStore((state) => state.deleteBoard);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const changeExistingState = useBoardsStore(
    (state) => state.changeExistingState,
  );
  const openBoardModal = useModalStore((state) => state.openBoardModal);

  const handleClickDelete = async () => {
    changeExistingState(boardId);
    await delay(ANIMATION_DELAY);
    deleteBoard(boardId);
    if (board?.todoIds && board.todoIds.length > 0) {
      board.todoIds.forEach((id) => deleteTodo(id));
    }
  };

  const handleClickOpenModal = (e: MouseEvent) => {
    e.stopPropagation();
    openBoardModal("board", boardId);
  };

  return (
    <div className="flex items-center relative mb-3">
      <Badge color={board?.color} className="absolute top-0 -left-1">
        {board?.title}
      </Badge>
      <FlexSpace />
      <DropdownMenu>
        <DropdownMenuTrigger style={{ color: board?.color }}>
          ···
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-10"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuItem
            className="justify-center"
            onClick={handleClickOpenModal}
          >
            수정
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <button
        style={{ color: board?.color }}
        onClick={handleClickDelete}
        className="px-2 -mt-1.5 rounded-full text-lg text-white ml-1"
      >
        x
      </button>
    </div>
  );
}
