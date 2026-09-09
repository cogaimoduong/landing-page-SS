import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { SupportChat } from "@/components/support-chat";
import "./globals.css";
import "./showcase.css";
import "./catalog.css";
import "./chat.css";
import "./chat-media.css";
import "./chat-template.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "DevDes.click — Design meets Development",
  description:
    "DevDes thiết kế và phát triển website, ứng dụng kinh doanh và phần mềm quản lý nội bộ cho tổ chức, doanh nghiệp.",
  keywords: ["thiết kế website", "lập trình web", "landing page", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body>{children}<SupportChat /></body>
    </html>
  );
}
