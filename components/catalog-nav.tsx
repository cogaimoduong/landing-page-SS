"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/components/locale-provider";
import { TemplateLogo } from "@/components/template-logo";

export function CatalogNav({ detail = false }: { detail?: boolean }) {
  const { locale } = useLocale();
  const copy = locale === "en"
    ? {
        navigation: "Main navigation",
        home: "Home",
        services: "Services",
        library: "Template library",
        choose: "Choose this template",
        discuss: "Discuss a project",
      }
    : {
        navigation: "Điều hướng chính",
        home: "Trang chủ",
        services: "Dịch vụ",
        library: "Kho giao diện",
        choose: "Chọn mẫu này",
        discuss: "Trao đổi dự án",
      };

  return (
    <nav className="catalog-nav catalog-shell" aria-label={copy.navigation}>
      <TemplateLogo />
      <div className="catalog-nav-links">
        <Link href="/">{copy.home}</Link>
        <Link href="/#services">{copy.services}</Link>
        <Link href="/giao-dien" aria-current={detail ? undefined : "page"}>{copy.library}</Link>
      </div>
      <div className="catalog-nav-actions">
        <LanguageSwitcher className="catalog-language-switcher" />
        <Link href="/#contact" className="catalog-contact">{detail ? copy.choose : copy.discuss}<ArrowUpRight size={16} /></Link>
      </div>
    </nav>
  );
}
