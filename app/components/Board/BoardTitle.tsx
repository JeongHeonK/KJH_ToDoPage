import { Badge } from "@/components/ui/badge";
import { useBoardsStore, useTodoStore } from "@/app/store";
import { delay } from "@/app/util";
import { ANIMATION_DELAY } from "@/app/constants";
import FlexSpace from "../FlexSpace";
import BoardDropdown from "./BoardDropdown";

interface BoardTitleProps {
  boardId: string;
}

export default function BoardTitle({ boardId }: BoardTitleProps) {
  const { handleClickDelete, title, color } = useBoardTitle(boardId);

  return (
    <div className="flex items-center relative mb-3">
      <Badge color={color} className="absolute top-0 -left-1">
        {title}
      </Badge>
      <FlexSpace />
      <BoardDropdown color={color} boardId={boardId} />
      <button
        style={{ color }}
        onClick={handleClickDelete}
        className="px-2 -mt-1.5 rounded-full text-lg text-white ml-1"
      >
        x
      </button>
    </div>
  );
}

const useBoardTitle = (boardId: string) => {
  const board = useBoardsStore((state) => {
    if (state.boards) {
      return state.boards.find((board) => board.id === boardId);
    }
  });
  const deleteBoard = useBoardsStore((state) => state.deleteBoard);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const changeExistingState = useBoardsStore(
    (state) => state.changeExistingState,
  );

  const title = board?.title;
  const color = board?.color;

  const handleClickDelete = async () => {
    changeExistingState(boardId);
    await delay(ANIMATION_DELAY);
    deleteBoard(boardId);
    if (board?.todoIds && board.todoIds.length > 0) {
      board.todoIds.forEach((id) => deleteTodo(id));
    }
  };

  return { handleClickDelete, title, color };
};
