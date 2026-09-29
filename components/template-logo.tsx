"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { useLocale } from "@/components/locale-provider";

export function TemplateLogo({ dark = false }: { dark?: boolean }) {
  const { locale } = useLocale();
  return (
    <Link className={`catalog-logo ${dark ? "on-dark" : ""}`} href="/" aria-label={locale === "en" ? "DevDes.click — Home" : "DevDes.click — Về trang chủ"}>
      <BrandLogo />
    </Link>
  );
}
