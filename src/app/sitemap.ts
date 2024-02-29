import type { MetadataRoute } from "next";
import { axiosInstance } from "@/services";

type Steady = {
  id: number;
  createdAt: Date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await axiosInstance.get(
    `/api/v1/steadies/search?page=0&like=false&status=RECRUITING`,
  );
  return response.data.content.map((steady: Steady) => ({
    url: `/steadies/${steady.id}`,
    changefreq: "daily",
    priority: 0.9,
    lastModified: new Date(steady.createdAt).toISOString(),
  }));
}
