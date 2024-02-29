import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://steadies.kr",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];
}
