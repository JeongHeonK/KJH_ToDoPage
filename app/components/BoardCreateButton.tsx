import { Button } from "@/components/ui/button";
import { useModalStore } from "../store";

export default function BoardCreateButton() {
  const openBoardModal = useModalStore((state) => state.openBoardModal);

  const handleClick = () => {
    openBoardModal("board");
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-white text-center text-black w-72 h-96 border border-zinc-800 border-dashed font-normal hover:bg-zinc-200"
    >
      보드 생성 하기
    </Button>
  );
}
