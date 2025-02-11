interface BorderItemProps {
  title: string;
}

export default function BorderItem({ title }: BorderItemProps) {
  return (
    <div className="border-2 border-red-200 min-w-[250px] h-fit rounded-lg px-2 py-3 bg-white">
      {title}
    </div>
  );
}
