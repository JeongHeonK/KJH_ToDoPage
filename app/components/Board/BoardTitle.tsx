import { Badge } from "@/components/ui/badge";
import FlexSpace from "../FlexSpace";

interface BoardTitleProps {
  title?: string;
  color: string;
}

export default function BoardTitle({ color, title }: BoardTitleProps) {
  return (
    <div className="flex items-center relative mb-3">
      <Badge color={color} className="absolute top-0 -left-1">
        {title}
      </Badge>
      <FlexSpace />
      <button
        style={{ background: color }}
        className="px-2 py-0 rounded-full text-sm text-white"
      >
        +
      </button>
    </div>
  );
}
