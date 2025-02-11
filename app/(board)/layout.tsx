import { PropsWithChildren } from "react";
import BoardModal from "./components/BoardModal";

export default function BoardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <BoardModal />
      {children}
    </>
  );
}
