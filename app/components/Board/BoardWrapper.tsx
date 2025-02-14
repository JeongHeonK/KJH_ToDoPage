import { PropsWithChildren } from "react";

export default function BoardWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row flex-nowrap overflow-x-scroll h-full gap-3 bg-white px-4">
      {children}
    </div>
  );
}
