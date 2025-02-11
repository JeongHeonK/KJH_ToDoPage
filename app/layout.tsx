import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import TodoSidebar from "./components/TodoSidebar";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "todo-app",
  description: "칸반보드 형식의 Todo-app 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSans.className} antialiased flex h-screen w-full`}
      >
        <SidebarProvider>
          <TodoSidebar />
          <main>{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
