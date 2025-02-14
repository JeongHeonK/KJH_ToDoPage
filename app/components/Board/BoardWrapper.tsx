import { PropsWithChildren } from "react";

export default function BoardWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center flex-nowrap h-full gap-3 bg-white px-4 md:overflow-x-scroll md:flex-row md:items-start">
      {children}
    </div>
  );
}
