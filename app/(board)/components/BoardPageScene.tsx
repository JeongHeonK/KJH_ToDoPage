import BoardItem from "./BoardItem";
import BoardWrapper from "./BoardWrapper";
import { COLORS } from "../consts";

const mockData = [
  {
    title: "할일 1",
    color: COLORS.fuchsia,
  },
  {
    title: "할일 2",
    color: COLORS.orange,
  },
  {
    title: "할일 3",
    color: COLORS.red,
  },
  {
    title: "할일 4",
    color: COLORS.rose,
  },
  {
    title: "할일 5",
    color: COLORS.slate,
  },
  {
    title: "할일 6",
    color: COLORS.teal,
  },
  {
    title: "할일 7",
    color: COLORS.yellow,
  },
];

export default function BoardPageScene() {
  return (
    <BoardWrapper>
      {mockData.map((item) => (
        <BoardItem key={item.title} title={item.title} color={item.color} />
      ))}
    </BoardWrapper>
  );
}
