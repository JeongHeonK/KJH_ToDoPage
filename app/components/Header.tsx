"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  const pathName = usePathname();
  const decodedPathName = decodeURI(pathName);
  const path = decodedPathName.slice(1).split("/").join(" > ");

  return (
    <header className="flex items-center gap-2 pt-2">
      <SidebarTrigger />
      <span className="text-sm -mt-1"> todo &gt; {path}</span>
    </header>
  );
}
