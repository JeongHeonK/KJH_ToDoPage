"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useModalStore } from "../store";

export default function Header() {
  const pathName = usePathname();
  const decodedPathName = decodePathName(pathName);
  const handleOpen = useModalStore((state) => state.handleOpen);

  return (
    <header className="flex items-center justify-start gap-2 pt-3 pb-2 w-full">
      <SidebarTrigger />
      <span className="text-sm -mt-1"> todo &gt; {decodedPathName}</span>
      <Button onClick={handleOpen} className="absolute right-3 top-2 text-sm">
        보드 생성
      </Button>
    </header>
  );
}

const decodePathName = (path: string) => {
  const decodedPathName = decodeURI(path).slice(1).split("/").join(" > ");

  return decodedPathName;
};
