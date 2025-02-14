"use client";

import { Button } from "@/components/ui/button";
import { useModalStore } from "../store";

export default function Header() {
  const openBoardModal = useModalStore((state) => state.openBoardModal);

  const handleOpenModal = () => {
    openBoardModal("board");
  };

  return (
    <header className="p-3 bg text-md fixed left-0 right-0 top-0 flex items-center bg-zinc-100">
      <h1 className="text-center flex-1">Kanban Board</h1>
      <Button
        type="button"
        className="text-[12px] absolute right-2 top-1 bg-zinc-800 hover:opacity-55"
        onClick={handleOpenModal}
      >
        보드 생성
      </Button>
    </header>
  );
}
