import { DevicePreview } from "@/components/device-preview";
import { TemplateLogo } from "@/components/template-logo";
import { getTemplate, templates } from "@/lib/templates";
import { ArrowLeft, ArrowUpRight, Check, Palette, PanelsTopLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};
  return { title: `${template.name} — Giao diện mẫu webdao`, description: template.description };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  return (
    <main className="detail-page">
      <nav className="catalog-nav catalog-shell">
        <TemplateLogo />
        <Link href="/giao-dien" className="back-link"><ArrowLeft size={16} /> Tất cả giao diện</Link>
        <Link href="/#contact" className="catalog-contact">Chọn mẫu này <ArrowUpRight size={17} /></Link>
      </nav>

      <header className="detail-head catalog-shell">
        <div className="detail-title">
          <span>{template.categoryLabel} · {template.style}</span>
          <h1>{template.name}</h1>
          <p>{template.description}</p>
        </div>
        <div className="detail-facts">
          <div><Palette /><span>MÀU CHỦ ĐẠO</span><b className="color-dot" style={{ background: template.accent }} /></div>
          <div><PanelsTopLeft /><span>HIỂN THỊ</span><b>Responsive</b></div>
        </div>
      </header>

      <section className="preview-section catalog-shell">
        <div className="preview-instruction"><span>LIVE PREVIEW</span><p>Chọn thiết bị bên dưới để xem giao diện thay đổi như thế nào.</p></div>
        <DevicePreview slug={template.slug} name={template.name} />
      </section>

      <section className="detail-bottom catalog-shell">
        <div><span>CÓ SẴN TRONG MẪU</span><h2>Nền tảng tốt<br />để bắt đầu.</h2></div>
        <ul>{template.features.map((feature) => <li key={feature}><Check /> {feature}</li>)}<li><Check /> Chuẩn responsive</li><li><Check /> Tùy chỉnh theo thương hiệu</li></ul>
        <Link href="/#contact">Tôi muốn dùng mẫu này <ArrowUpRight /></Link>
      </section>
    </main>
  );
}
