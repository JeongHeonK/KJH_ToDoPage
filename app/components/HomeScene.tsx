"use client";

import { useEffect, useState } from "react";
import BoardWrapper from "./BoardWrapper";
import BoardItem from "./BoardItem";
import { useBoardsStore } from "../store";

export default function HomeScene() {
  const [isLoading, setIsLoading] = useState(true);
  const boards = useBoardsStore((state) => state.boards);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading..</div>;

  if (boards === undefined || boards.length === 0)
    return <div> 아직 생성된 보드가 없습니다.</div>;

  return (
    <BoardWrapper>
      {boards.map((item) => (
        <BoardItem
          key={item.id}
          id={item.id}
          title={item.title}
          color={item.color}
        />
      ))}
    </BoardWrapper>
  );
}
