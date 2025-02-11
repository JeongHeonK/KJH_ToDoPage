import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import TodoSidebar from "./components/TodoSidebar";
import Header from "./components/Header";

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
      <body className={`${notoSans.className} antialiased`}>
        <SidebarProvider>
          <TodoSidebar />
          <main className="flex-1">
            <Header />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
