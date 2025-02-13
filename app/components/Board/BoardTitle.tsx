import { Badge } from "@/components/ui/badge";
import { useBoardsStore, useTodoStore } from "@/app/store";
import { delay } from "@/app/util";
import { ANIMATION_DELAY } from "@/app/constants";
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

  const handleClickDelete = async () => {
    changeExistingState(boardId);
    await delay(ANIMATION_DELAY);
    deleteBoard(boardId);
    if (board?.todoIds && board.todoIds.length > 0) {
      board.todoIds.forEach((id) => deleteTodo(id));
    }
  };
  return (
    <div className="flex items-center relative mb-3">
      <Badge color={board?.color} className="absolute top-0 -left-1">
        {board?.title}
      </Badge>
      <FlexSpace />
      <button
        style={{ color: board?.color }}
        onClick={handleClickDelete}
        className="px-2 -mt-1.5 rounded-full text-lg text-white"
      >
        x
      </button>
    </div>
  );
}
