import { DevDesHome } from "@/components/devdes-home";
import type { Metadata } from "next";
import "./home.css";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

export default function Home() {
  return <DevDesHome />;
}
