import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MouseEvent } from "react";

export default function TodoEditButton() {
  const handleEdit = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>···</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-10"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem className="justify-center" onClick={handleEdit}>
          수정
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center" onClick={handleEdit}>
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
