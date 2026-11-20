import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

// Add public routes here as the product grows.
const routes = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${siteConfig.url}${route}` }));
}
