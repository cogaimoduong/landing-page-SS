"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/components/locale-provider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const label = locale === "en" ? "Choose language" : "Chọn ngôn ngữ";

  return (
    <div className={`language-switcher ${className}`.trim()} role="group" aria-label={label}>
      <Languages aria-hidden="true" size={15} />
      <button
        type="button"
        className={locale === "en" ? "is-active" : undefined}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className={locale === "vi" ? "is-active" : undefined}
        aria-pressed={locale === "vi"}
        onClick={() => setLocale("vi")}
      >
        VI
      </button>
    </div>
  );
}
