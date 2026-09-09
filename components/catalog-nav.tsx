import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TemplateLogo } from "@/components/template-logo";

export function CatalogNav({ detail = false }: { detail?: boolean }) {
  return (
    <nav className="catalog-nav catalog-shell" aria-label="Điều hướng chính">
      <TemplateLogo />
      <div className="catalog-nav-links">
        <Link href="/">Trang chủ</Link>
        <Link href="/#services">Dịch vụ</Link>
        <Link href="/giao-dien" aria-current={detail ? undefined : "page"}>Kho giao diện</Link>
      </div>
      <Link href="/#contact" className="catalog-contact">{detail ? "Chọn mẫu này" : "Trao đổi dự án"}<ArrowUpRight size={16} /></Link>
    </nav>
  );
}
