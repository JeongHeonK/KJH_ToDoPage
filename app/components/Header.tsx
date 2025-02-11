import { Button } from "@/components/ui/button";
import FlexSpace from "./FlexSpace";

export default function Header() {
  return (
    <header className="p-3 bg-slate-200 text-md fixed left-0 right-0 top-0 flex items-center">
      <span>Kanban Board</span>
      <FlexSpace />
      <Button type="button" className="text-sm">
        보드 생성
      </Button>
    </header>
  );
}
