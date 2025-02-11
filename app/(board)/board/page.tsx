import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board",
  description: "board를 조회하고 편집할 수 있습니다.",
};

export default function BoardPage() {
  return <div className="bg-zinc-100 m-2">to-do-app(board)</div>;
}
