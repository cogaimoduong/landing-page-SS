import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Be_Vietnam_Pro, Noto_Serif } from "next/font/google";
import { SupportChat } from "@/components/support-chat";
import { LocaleProvider } from "@/components/locale-provider";
import { defaultLocale, localeCookieName, localeFrom } from "@/lib/i18n";
import "./globals.css";
import "./showcase.css";
import "./catalog.css";
import "./chat.css";
import "./chat-media.css";
import "./chat-email.css";
import "./chat-library.css";
import "./chat-template.css";
import "./chat-session.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.devdes.click"),
  title: "DevDes.click — Design meets Development",
  description:
    "DevDes designs and develops purposeful websites, business applications, and internal software for ambitious teams.",
  keywords: ["website design", "web development", "landing page", "Next.js"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DevDes.click",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const locale = localeFrom(cookieStore.get(localeCookieName)?.value, defaultLocale);

  return (
    <html lang={locale} className={`${beVietnamPro.variable} ${notoSerif.variable}`} suppressHydrationWarning>
      <body>
        <LocaleProvider initialLocale={locale}>
          {children}
          <SupportChat />
        </LocaleProvider>
      </body>
    </html>
  );
}
