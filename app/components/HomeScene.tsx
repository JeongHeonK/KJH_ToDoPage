"use client";

import { useEffect, useState } from "react";
import { BoardItem, BoardWrapper } from "./Board";
import { useBoardsStore } from "../store";
import EmptyBoardMessage from "./EmptyBoardMessage";

export default function HomeScene() {
  const [isLoading, setIsLoading] = useState(true);
  const boards = useBoardsStore((state) => state.boards);
  const isEmptyBoards = boards === undefined || boards.length === 0;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading..</div>;

  if (isEmptyBoards) return <EmptyBoardMessage />;

  return (
    <BoardWrapper>
      {boards.map((item) => (
        <BoardItem key={item.id} boardId={item.id} />
      ))}
    </BoardWrapper>
  );
}
