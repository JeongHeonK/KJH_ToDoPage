import { PropsWithChildren } from "react";

export default function BoardWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row flex-nowrap overflow-x-scroll bg-zinc-100 h-full gap-3">
      {children}
    </div>
  );
}
