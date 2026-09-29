"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CatalogNav } from "@/components/catalog-nav";
import { TemplateGallery } from "@/components/template-gallery";
import { TemplateLogo } from "@/components/template-logo";
import { useLocale } from "@/components/locale-provider";
import { getCategories, getTemplates } from "@/lib/templates";

export function CatalogPage() {
  const { locale } = useLocale();
  const templates = getTemplates(locale);
  const categories = getCategories(locale);
  const copy = locale === "en"
    ? {
        eyebrow: "DEVDES® — TEMPLATE COLLECTION",
        titleLineOne: "A strong beginning",
        titleLineTwo: "A website made for you",
        explore: "EXPLORE THE COLLECTION",
        description:
          "From an idea to a website with character. Choose an interface you love, and we will tailor it to your brand together.",
        interfaces: "INTERFACES",
        fields: "FIELDS",
        collectionIndex: "(01 — COLLECTION)",
        selectTemplate: "CHOOSE A TEMPLATE TO VIEW & EXPERIENCE",
        startIndex: "(02 — LET'S START)",
        anotherIdea: "HAVE A DIFFERENT IDEA?",
        footerLineOne: "Let's make",
        footerLineTwo: "something distinct",
        footerNote: "Thoughtful design, deep development",
      }
    : {
        eyebrow: "DEVDES® — BỘ SƯU TẬP GIAO DIỆN",
        titleLineOne: "Một khởi đầu tốt",
        titleLineTwo: "Một website của bạn",
        explore: "KHÁM PHÁ BỘ SƯU TẬP",
        description:
          "Từ một ý tưởng đến một website có cá tính. Chọn giao diện bạn thích, chúng tôi sẽ cùng tinh chỉnh để phù hợp với thương hiệu của bạn.",
        interfaces: "GIAO DIỆN",
        fields: "LĨNH VỰC",
        collectionIndex: "(01 — BỘ SƯU TẬP)",
        selectTemplate: "CHỌN MẪU ĐỂ XEM & TRẢI NGHIỆM",
        startIndex: "(02 — CÙNG BẮT ĐẦU)",
        anotherIdea: "CÓ Ý TƯỞNG KHÁC?",
        footerLineOne: "Cùng làm nên",
        footerLineTwo: "điều khác biệt",
        footerNote: "Thiết kế có tư duy, phát triển có chiều sâu",
      };

  return (
    <main className="catalog-page devdes-catalog">
      <CatalogNav />
      <header className="catalog-hero catalog-shell">
        <div className="catalog-eyebrow"><span>{copy.eyebrow}</span><span>DESIGN MEETS DEVELOPMENT</span></div>
        <h1>{copy.titleLineOne}<br /><span>{copy.titleLineTwo}</span></h1>
        <div className="catalog-intro">
          <a className="catalog-explore" href="#collection"><ArrowDown size={20} /><span>{copy.explore}</span></a>
          <p>{copy.description}</p>
          <div className="catalog-count"><b>{String(templates.length).padStart(2, "0")}</b><span>{copy.interfaces} · {categories.length - 1} {copy.fields}</span></div>
        </div>
      </header>
      <div className="catalog-collection-label catalog-shell"><span>{copy.collectionIndex}</span><span>{copy.selectTemplate} <ArrowUpRight size={14} /></span></div>
      <TemplateGallery />
      <footer className="catalog-cta">
        <div className="catalog-shell">
          <div className="catalog-footer-top"><span>{copy.startIndex}</span><span>{copy.anotherIdea}</span></div>
          <Link href="/#contact" className="catalog-contact-title"><h2>{copy.footerLineOne}<br /><span>{copy.footerLineTwo}</span></h2><ArrowUpRight /></Link>
          <div className="catalog-footer-bottom"><TemplateLogo dark /><p>{copy.footerNote}</p><span>© 2026 DevDes.click</span></div>
        </div>
      </footer>
    </main>
  );
}
