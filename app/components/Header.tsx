"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  const pathName = usePathname();
  const path = pathName.slice(1);

  return (
    <header className="flex items-center gap-2 pt-2">
      <SidebarTrigger />
      <span className="text-sm -mt-1"> todo &gt; {path}</span>
    </header>
  );
}
