import type { MetadataRoute } from "next";
import { publicRoutes, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/early-access" ? 0.9 : 0.6,
  }));
}
