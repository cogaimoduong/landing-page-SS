import type { MetadataRoute } from "next";
import { templates } from "@/lib/templates";

const siteUrl = "https://www.devdes.click";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/giao-dien`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...templates.map((template) => ({
      url: `${siteUrl}/giao-dien/${template.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
