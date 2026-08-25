"use client";

import { categories, templates, type TemplateCategory } from "@/lib/templates";
import { ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Filter = "all" | TemplateCategory;

export function TemplateGallery() {
  const [active, setActive] = useState<Filter>("all");
  const visible = active === "all" ? templates : templates.filter((item) => item.category === active);

  return (
    <section className="gallery-section catalog-shell">
      <div className="filter-bar" aria-label="Lọc giao diện">
        {categories.map((category) => (
          <button
            className={active === category.id ? "active" : ""}
            key={category.id}
            onClick={() => setActive(category.id as Filter)}
          >
            {category.label} <sup>{category.count}</sup>
          </button>
        ))}
      </div>

      <div className="template-grid">
        {visible.map((template, index) => (
          <article className="template-card" key={template.slug} style={{ "--card-delay": `${index * 45}ms` } as React.CSSProperties}>
            <Link href={`/giao-dien/${template.slug}`} className="template-thumb" style={{ background: template.tone }}>
              <div className="mini-browser">
                <div className="mini-top"><i /><i /><i /></div>
                <div
                  className={`mini-site mini-${template.category}`}
                  style={{ "--demo-accent": template.accent, "--demo-dark": template.dark, backgroundImage: template.image ? `linear-gradient(90deg, ${template.dark}dd 0%, ${template.dark}55 65%), url(${template.image})` : undefined } as React.CSSProperties}
                >
                  <div className="mini-nav"><b>{template.name}</b><span>Menu&nbsp;&nbsp; About&nbsp;&nbsp; Contact</span></div>
                  {template.category === "management" ? (
                    <div className="mini-dashboard"><aside /><div><span /><span /><span /><section><i /><i /><i /></section></div></div>
                  ) : (
                    <div className="mini-copy"><small>{template.categoryLabel}</small><strong>{template.tagline}</strong><button>Khám phá →</button></div>
                  )}
                </div>
              </div>
              <span className="preview-hover"><Eye /> Xem giao diện</span>
            </Link>
            <div className="template-meta">
              <div><span>{template.categoryLabel}</span><h2>{template.name}</h2><p>{template.style}</p></div>
              <Link href={`/giao-dien/${template.slug}`} aria-label={`Xem ${template.name}`}><ArrowUpRight /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
