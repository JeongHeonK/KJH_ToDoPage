interface TodoCreateButtonProps {
  color: string;
}

export default function TodoCreateButton({ color }: TodoCreateButtonProps) {
  return (
    <button
      type="button"
      style={{ borderColor: color, color }}
      className="text-center rounded-lg shadow-md py-2 px-3 border border-dashed"
    >
      +
    </button>
  );
}
