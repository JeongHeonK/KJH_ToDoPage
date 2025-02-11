import { PropsWithChildren } from "react";
import { BoardCreationModal } from "./components/BoardModal";

export default function BoardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <BoardCreationModal />
      {children}
    </>
  );
}
