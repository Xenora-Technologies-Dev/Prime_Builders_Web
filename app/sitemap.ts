import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.websiteUrl;

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
