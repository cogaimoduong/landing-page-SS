import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateDetail } from "@/components/template-detail";
import { getTemplate, templates } from "@/lib/templates";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};
  return {
    title: `${template.name} — DevDes Template`,
    description: template.description,
    alternates: {
      canonical: `/giao-dien/${template.slug}`,
    },
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!getTemplate(slug)) notFound();
  return <TemplateDetail slug={slug} />;
}
