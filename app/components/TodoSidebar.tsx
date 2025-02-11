import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sidebarItem = [
  { title: "Board", url: "/board" },
  { title: "할 일", url: "/works" },
];

export default function TodoSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroupLabel className="pl-4 pt-2 -mb-1">To-Do</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {sidebarItem.map((item) => (
              <SidebarMenuItem key={item.title} className="pl-2">
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
