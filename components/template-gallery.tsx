"use client";

import { getCategories, getTemplates, type TemplateCategory } from "@/lib/templates";
import { ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/locale-provider";

type Filter = "all" | TemplateCategory;

export function TemplateGallery() {
  const { locale } = useLocale();
  const [active, setActive] = useState<Filter>("all");
  const templates = getTemplates(locale);
  const categories = getCategories(locale);
  const copy = locale === "en"
    ? {
        collection: "Template collection",
        filter: "Filter templates",
        appInterface: "APP INTERFACE",
        itemsTracked: "ITEMS TRACKED",
        explore: "Explore →",
        inDevelopment: "APP · IN DEVELOPMENT",
        preview: "View interface",
        developing: "App currently in development",
        originalImage: "Original website image",
        view: "View",
      }
    : {
        collection: "Bộ sưu tập giao diện",
        filter: "Lọc giao diện",
        appInterface: "GIAO DIỆN APP",
        itemsTracked: "MỤC ĐANG THEO DÕI",
        explore: "Khám phá →",
        inDevelopment: "APP · ĐANG PHÁT TRIỂN",
        preview: "Xem giao diện",
        developing: "App đang trong quá trình phát triển",
        originalImage: "Ảnh website gốc",
        view: "Xem",
      };
  const visible = active === "all" ? templates : templates.filter(item => item.category === active);

  return (
    <section className="gallery-section catalog-shell" id="collection" aria-label={copy.collection}>
      <div className="filter-bar" aria-label={copy.filter}>
        {categories.map((category) => (
          <button
            className={active === category.id ? "active" : ""}
            aria-pressed={active === category.id}
            key={category.id}
            onClick={() => setActive(category.id as Filter)}
          >
            {category.label} <sup>{category.count}</sup>
          </button>
        ))}
      </div>

      <p className="collection-results" role="status">{visible.length} {locale === "en" ? "templates to explore" : "giao diện để khám phá"}<span>{locale === "en" ? "DESKTOP · TABLET · MOBILE" : "MÁY TÍNH · TABLET · ĐIỆN THOẠI"}</span></p>
      <div className="template-grid">
        {visible.map((template, index) => (
          <article className="template-card" key={template.slug} style={{ "--card-delay": `${index * 45}ms` } as React.CSSProperties}>
            <Link href={`/giao-dien/${template.slug}`} className="template-thumb" style={{ background: template.tone, "--demo-accent": template.accent, "--demo-dark": template.dark } as React.CSSProperties}>
              {template.originalUrl ? <div className="original-template-cover" style={{ backgroundImage: `url(${template.image})` }} role="img" aria-label={`${copy.originalImage} ${template.name}`} /> : template.sourceKind === "app" ? <div className="mini-app-preview">
                <div className="mini-app-phone">
                  <i /><header><small>{copy.appInterface}</small><b>{template.name}</b></header><div className="mini-app-summary"><span>12</span><small>{copy.itemsTracked}</small><em>+12%</em></div><div className="mini-app-stat"><b>86%</b><span /><b>24</b></div><div className="mini-app-list"><i /><i /><i /></div><footer><span /><span className="active" /><span /></footer>
                </div>
              </div> : <div className="mini-browser">
                <div className="mini-top"><i /><i /><i /></div>
                <div
                  className={`mini-site mini-${template.category}`}
                  style={{ "--demo-accent": template.accent, "--demo-dark": template.dark, backgroundImage: template.image ? `linear-gradient(90deg, ${template.dark}dd 0%, ${template.dark}55 65%), url(${template.image})` : undefined } as React.CSSProperties}
                >
                  <div className="mini-nav"><b>{template.name}</b><span>Menu&nbsp;&nbsp; About&nbsp;&nbsp; Contact</span></div>
                  {template.category === "catalog" ? (
                    <div className="mini-copy mini-fashion-copy">
                      <small>LITTLE & LOVED / 0–8 YEARS</small>
                      <strong>{locale === "en" ? "Little clothes." : "Nhỏ xíu thôi."}<br /><em>{locale === "en" ? "Big adventures." : "Yêu hết nấc."}</em></strong>
                      <span className="mini-button">{locale === "en" ? "Shop little favourites ↗" : "Sắm đồ xinh cho bé ↗"}</span>
                    </div>
                  ) : template.category === "management" ? (
                    <div className="mini-dashboard"><aside /><div><span /><span /><span /><section><i /><i /><i /></section></div></div>
                  ) : (
                    <div className="mini-copy"><small>{template.categoryLabel}</small><strong>{template.tagline}</strong><span className="mini-button">{copy.explore}</span></div>
                  )}
                </div>
              </div>}
              {template.inDevelopment && <span className="template-preview-status">{copy.inDevelopment}</span>}
              <span className="preview-hover"><Eye /> {copy.preview}</span>
            </Link>
            <div className="template-meta">
              <div><span>{template.categoryLabel}</span><h2>{template.name}</h2><p>{template.style}</p>{template.inDevelopment && <small className="template-development-note">{copy.developing}</small>}</div>
              <Link href={`/giao-dien/${template.slug}`} aria-label={`${copy.view} ${template.name}`}><ArrowUpRight /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
