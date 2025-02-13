import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MouseEvent } from "react";

interface TodoDropdownProps {
  onEdit: (e: MouseEvent) => void;
  onDelete: (e: MouseEvent) => Promise<void>;
}

export default function TodoDropdown({ onEdit, onDelete }: TodoDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>···</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-10"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem className="justify-center" onClick={onEdit}>
          수정
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-center" onClick={onDelete}>
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
