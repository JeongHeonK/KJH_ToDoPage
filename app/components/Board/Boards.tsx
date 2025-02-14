import { useBoardsStore } from "@/app/store";
import BoardItem from "./BoardItem";
import BoardWrapper from "./BoardWrapper";
import EmptyBoardMessage from "./EmptyBoardMessage";

export default function Boards() {
  const boards = useBoardsStore((state) => state.boards);
  const isEmptyBoards = boards === undefined || boards.length === 0;

  if (isEmptyBoards) return <EmptyBoardMessage />;

  return (
    <BoardWrapper>
      {boards.map((item) => (
        <BoardItem key={item.id} boardId={item.id} />
      ))}
    </BoardWrapper>
  );
}
