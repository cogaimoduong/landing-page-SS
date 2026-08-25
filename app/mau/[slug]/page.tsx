import { DemoSite } from "@/components/demo-site";
import { getTemplate, templates } from "@/lib/templates";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const template = getTemplate((await params).slug);
  return template ? { title: `${template.name} — Live Demo` } : {};
}

export default async function DemoPage({ params }: Props) {
  const template = getTemplate((await params).slug);
  if (!template) notFound();
  return <DemoSite template={template} />;
}
