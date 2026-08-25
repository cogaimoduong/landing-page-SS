import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "webdao — Website xịn, làm nhanh, chạy mượt",
  description:
    "Dịch vụ thiết kế và phát triển website cho startup, local brand và những người làm điều tử tế.",
  keywords: ["thiết kế website", "lập trình web", "landing page", "Next.js"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
