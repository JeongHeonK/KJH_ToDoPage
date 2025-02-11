import { Metadata } from "next";
import BoardPageScene from "../components";

export const metadata: Metadata = {
  title: "Board",
  description: "board를 조회하고 편집할 수 있습니다.",
};

export default function BoardPage() {
  return <BoardPageScene />;
}
