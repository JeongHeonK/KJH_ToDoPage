import BoardCreateButton from "../BoardCreateButton";

export default function EmptyBoardMessage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h3>아직 생성된 보드가 없습니다.</h3>
      <BoardCreateButton />
    </div>
  );
}
