import type { Metadata } from "next";
import { TemplateGallery } from "@/components/template-gallery";
import { TemplateLogo } from "@/components/template-logo";
import { templates } from "@/lib/templates";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kho giao diện mẫu — webdao",
  description: "Khám phá các giao diện website mẫu cho khách sạn, dịch vụ cho thuê, phần mềm quản lý và quảng cáo.",
};

export default function TemplatesPage() {
  return (
    <main className="catalog-page">
      <nav className="catalog-nav catalog-shell">
        <TemplateLogo />
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Về trang chính</Link>
        <Link href="/#contact" className="catalog-contact">Tư vấn giao diện <ArrowUpRight size={17} /></Link>
      </nav>

      <header className="catalog-hero catalog-shell">
        <div className="catalog-badge"><Sparkles size={14} /> 12 GIAO DIỆN ĐẦU TIÊN</div>
        <h1>Chọn một giao diện.<br /><em>Biến nó thành của bạn.</em></h1>
        <div className="catalog-intro">
          <p>Khám phá giao diện mẫu theo từng lĩnh vực. Mỗi mẫu đều có thể tùy chỉnh màu sắc, nội dung và tính năng theo thương hiệu của bạn.</p>
          <span><b>{templates.length}</b> mẫu đang có</span>
          <span><b>40+</b> mẫu sắp ra mắt</span>
        </div>
      </header>

      <TemplateGallery />

      <section className="catalog-cta">
        <div className="catalog-shell">
          <span>KHÔNG THẤY MẪU PHÙ HỢP?</span>
          <h2>Tui thiết kế riêng<br />cho bạn một chiếc.</h2>
          <Link href="/#contact">Kể tui nghe ý tưởng <ArrowUpRight /></Link>
        </div>
      </section>
    </main>
  );
}
