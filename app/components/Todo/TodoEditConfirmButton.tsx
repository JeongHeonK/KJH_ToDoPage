import { MouseEvent } from "react";

interface TodoEditConfirmButtonProps {
  onEdit: (e: MouseEvent) => void;
}

export default function TodoEditConfirmButton({
  onEdit,
}: TodoEditConfirmButtonProps) {
  return (
    <button
      onClick={onEdit}
      className="text-[12px] px-2 py-1 rounded-md bg-green-700 text-white"
    >
      수정
    </button>
  );
}
