"use client";

import { Button } from "@/components/ui/button";
import FlexSpace from "./FlexSpace";
import { useModalStore } from "../store";

export default function Header() {
  const openBoardModal = useModalStore((state) => state.openBoardModal);

  const handleOpenModal = () => {
    openBoardModal("board");
  };

  return (
    <header className="p-3 bg-slate-200 text-sm fixed left-0 right-0 top-0 flex items-center">
      <span>Kanban Board</span>
      <FlexSpace />
      <Button type="button" className="text-sm" onClick={handleOpenModal}>
        보드 생성
      </Button>
    </header>
  );
}
