"use client";

import { useEffect, useState } from "react";
import BoardWrapper from "./BoardWrapper";
import BorderItem from "./BorderItem";

export default function HomeScene() {
  const [boardArr, setBoardArr] =
    useState<{ title: string; color: string }[]>();
  const [isLoading, setIsLoading] = useState(true);

  // 전역처리 필요
  // const handleChangeBoard = useCallback(
  //   (newData: { title: string; color: string }) => {
  //     if (boardArr) {
  //       setBoardArr((prev) => prev?.concat(newData));
  //     }
  //   },
  //   [],
  // );

  useEffect(() => {
    if (!window) return;

    const result = window.localStorage.getItem("board");
    if (result) {
      const boardArr = JSON.parse(result);

      setBoardArr(boardArr);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading..</div>;

  if (boardArr === undefined) return <div> 아직 생성된 보드가 없습니다.</div>;

  return (
    <BoardWrapper>
      {boardArr.map((item) => (
        <BorderItem key={item.title} title={item.title} color={item.color} />
      ))}
    </BoardWrapper>
  );
}
