import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";

export const metadata: Metadata = {
  title: "Template Library — DevDes.click",
  description:
    "Explore DevDes website templates for rental, hospitality, management, advertising, and creative portfolios. Preview an interface and make it your own.",
  alternates: {
    canonical: "/giao-dien",
  },
};

export default function TemplatesPage() {
  return <CatalogPage />;
}
