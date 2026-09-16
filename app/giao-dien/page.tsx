import type { Metadata } from "next";
import { TemplateGallery } from "@/components/template-gallery";
import { TemplateLogo } from "@/components/template-logo";
import { CatalogNav } from "@/components/catalog-nav";
import { categories, templates } from "@/lib/templates";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kho giao diện — DevDes.click",
  description: "Khám phá bộ sưu tập website mẫu của DevDes: cho thuê, khách sạn, quản lý, quảng cáo và portfolio. Xem thử và chọn giao diện cho thương hiệu của bạn.",
};

export default function TemplatesPage() {
  return (
    <main className="catalog-page devdes-catalog">
      <CatalogNav />
      <header className="catalog-hero catalog-shell">
        <div className="catalog-eyebrow"><span>DEVDES® — BỘ SƯU TẬP GIAO DIỆN</span><span>DESIGN MEETS DEVELOPMENT</span></div>
        <h1>Một khởi đầu tốt.<br /><span>Một website của bạn.</span></h1>
        <div className="catalog-intro">
          <a className="catalog-explore" href="#collection"><ArrowDown size={20} /><span>KHÁM PHÁ BỘ SƯU TẬP</span></a>
          <p>Từ một ý tưởng đến một website có cá tính. Chọn giao diện bạn thích, chúng tôi sẽ cùng tinh chỉnh để phù hợp với thương hiệu của bạn.</p>
          <div className="catalog-count"><b>{String(templates.length).padStart(2, "0")}</b><span>GIAO DIỆN · {categories.length - 1} LĨNH VỰC</span></div>
        </div>
      </header>
      <div className="catalog-collection-label catalog-shell"><span>(01 — BỘ SƯU TẬP)</span><span>CHỌN MẪU ĐỂ XEM & TRẢI NGHIỆM <ArrowUpRight size={14} /></span></div>
      <TemplateGallery />
      <footer className="catalog-cta">
        <div className="catalog-shell">
          <div className="catalog-footer-top"><span>(02 — CÙNG BẮT ĐẦU)</span><span>CÓ Ý TƯỞNG KHÁC?</span></div>
          <Link href="/#contact" className="catalog-contact-title"><h2>Cùng làm nên<br /><span>điều khác biệt.</span></h2><ArrowUpRight /></Link>
          <div className="catalog-footer-bottom"><TemplateLogo dark /><p>Thiết kế có tư duy. Phát triển có chiều sâu.</p><span>© 2026 DevDes.click</span></div>
        </div>
      </footer>
    </main>
  );
}
