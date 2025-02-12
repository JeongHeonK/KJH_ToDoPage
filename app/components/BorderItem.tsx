interface BorderItemProps {
  title?: string;
  color: string;
}

export default function BorderItem({ title, color }: BorderItemProps) {
  return (
    <div
      className="border-2 min-w-[250px] h-fit rounded-lg px-2 py-3 bg-white"
      style={{ border: `2px solid ${color}` }}
      draggable
    >
      {title}
    </div>
  );
}
