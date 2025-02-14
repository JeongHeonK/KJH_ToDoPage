import { useBoardsStore, useModalStore } from "@/app/store";

interface TodoCreateButtonProps {
  boardId: string;
}

export default function TodoCreateButton({ boardId }: TodoCreateButtonProps) {
  const { handleOpenModal, color } = useTodoCreateButton(boardId);

  return (
    <button
      type="button"
      onClick={handleOpenModal}
      style={{ borderColor: color, color }}
      className="text-center rounded-lg shadow-md py-2 px-3 border border-dashed"
    >
      +
    </button>
  );
}

const useTodoCreateButton = (boardId: string) => {
  const color = useBoardsStore((state) => {
    if (state.boards) {
      return state.boards.find((board) => board.id === boardId)?.color;
    }
  });
  const openTodoModal = useModalStore((state) => state.openTodoModal);
  const handleOpenModal = () => {
    openTodoModal("todo", boardId);
  };

  return { color, handleOpenModal };
};
