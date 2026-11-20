import type { MetadataRoute } from "next";

import { routes, siteConfig } from "@/lib/site";

// Generated from `routes` in src/lib/site.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.filter((route) => route.sitemap).map((route) => ({ url: `${siteConfig.url}${route.href}` }));
}
