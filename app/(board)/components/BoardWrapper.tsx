import { PropsWithChildren } from "react";

export default function BoardWrapper({ children }: PropsWithChildren) {
  return (
    <div className="bg-zinc-100 m-2 h-full flex-col flex items-center gap-3 md:items-start rounded-md py-4 px-3 md:grid md:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
