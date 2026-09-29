"use client";

import { ArrowUpRight, Check, Palette, PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { CatalogNav } from "@/components/catalog-nav";
import { DevicePreview } from "@/components/device-preview";
import { useLocale } from "@/components/locale-provider";
import { getTemplate } from "@/lib/templates";

export function TemplateDetail({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const template = getTemplate(slug, locale);
  if (!template) return null;

  const copy = locale === "en"
    ? {
        developing: "App currently in development",
        primaryColor: "PRIMARY COLOR",
        display: "DISPLAY",
        responsive: "Responsive",
        livePreview: "LIVE PREVIEW",
        previewInstruction: "Choose a device below to see how this interface adapts.",
        originalWebsite: "ORIGINAL WEBSITE",
        originalTitleLineOne: "The right design.",
        originalTitleLineTwo: "The right experience.",
        originalDescription:
          "This template is shown directly from the website you provided, preserving the original content, imagery, fonts, and interactions.",
        openOriginal: "Open original website",
        included: "INCLUDED IN THE TEMPLATE",
        includedTitleLineOne: "A strong foundation",
        includedTitleLineTwo: "to get started.",
        responsiveReady: "Responsive by default",
        customizable: "Customizable to your brand",
        useTemplate: "I want to use this template",
      }
    : {
        developing: "App đang trong quá trình phát triển",
        primaryColor: "MÀU CHỦ ĐẠO",
        display: "HIỂN THỊ",
        responsive: "Tương thích nhiều thiết bị",
        livePreview: "XEM TRƯỚC TRỰC TIẾP",
        previewInstruction: "Chọn thiết bị bên dưới để xem giao diện thay đổi như thế nào.",
        originalWebsite: "WEBSITE GỐC",
        originalTitleLineOne: "Đúng thiết kế.",
        originalTitleLineTwo: "Đúng trải nghiệm.",
        originalDescription:
          "Mẫu này được hiển thị trực tiếp từ website bạn đã cung cấp, giữ nguyên nội dung, hình ảnh, font chữ và tương tác của bản gốc.",
        openOriginal: "Xem website gốc",
        included: "CÓ SẴN TRONG MẪU",
        includedTitleLineOne: "Nền tảng tốt",
        includedTitleLineTwo: "để bắt đầu.",
        responsiveReady: "Chuẩn responsive",
        customizable: "Tùy chỉnh theo thương hiệu",
        useTemplate: "Tôi muốn dùng mẫu này",
      };

  return (
    <main className="detail-page devdes-detail">
      <CatalogNav detail />

      <header className="detail-head catalog-shell">
        <div className="detail-title">
          <span>{template.categoryLabel} · {template.style}</span>
          <h1>{template.name}</h1>
          <p>{template.description}</p>
          {template.inDevelopment && <small className="detail-development-note">{copy.developing}</small>}
        </div>
        <div className="detail-facts">
          <div><Palette /><span>{copy.primaryColor}</span><b className="color-dot" style={{ background: template.accent }} /></div>
          <div><PanelsTopLeft /><span>{copy.display}</span><b>{copy.responsive}</b></div>
        </div>
      </header>

      <section className="preview-section catalog-shell">
        <div className="preview-instruction"><span>{copy.livePreview}</span><p>{copy.previewInstruction}</p></div>
        <DevicePreview slug={template.slug} name={template.name} app={template.sourceKind === "app"} />
      </section>

      {template.originalUrl ? <section className="detail-bottom catalog-shell">
        <div><span>{copy.originalWebsite}</span><h2>{copy.originalTitleLineOne}<br />{copy.originalTitleLineTwo}</h2></div>
        <p>{copy.originalDescription}</p>
        <a href={template.originalUrl} target="_blank" rel="noreferrer">{copy.openOriginal} <ArrowUpRight /></a>
      </section> : <section className="detail-bottom catalog-shell">
        <div><span>{copy.included}</span><h2>{copy.includedTitleLineOne}<br />{copy.includedTitleLineTwo}</h2></div>
        <ul>{template.features.map((feature) => <li key={feature}><Check /> {feature}</li>)}<li><Check /> {copy.responsiveReady}</li><li><Check /> {copy.customizable}</li></ul>
        <Link href="/#contact">{copy.useTemplate} <ArrowUpRight /></Link>
      </section>}
    </main>
  );
}
