interface WorkDetailPageProps {
  params: Promise<{ title: string }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { title } = await params;
  const decodedTitle = decodeURI(title);
  return <div className="bg-zinc-100 m-2">{decodedTitle}</div>;
}
