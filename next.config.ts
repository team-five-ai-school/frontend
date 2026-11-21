import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components: `"use cache"` + `cacheLife` + `cacheTag` (see AGENTS.md → Caching).
  cacheComponents: true,
  partialPrefetching: true,
  // React Compiler memoizes automatically — no manual useMemo/useCallback needed.
  reactCompiler: true,
  // <Link href> is type-checked against real routes.
  typedRoutes: true,

  images: {
    // AVIF first (smallest), WebP fallback, original format as last resort.
    formats: ["image/avif", "image/webp"],
    // Optimized images are cached for 31 days. Static imports are hashed and immutable anyway.
    minimumCacheTTL: 2_678_400,
    // Add remote hosts here before using them with next/image, e.g.
    // { protocol: "https", hostname: "images.unsplash.com" }
    remotePatterns: [],
  },

  // Security headers (from the Next.js PWA guide). The service worker must never be cached.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },

  experimental: {
    // Tree-shake barrel imports (lucide-react is already optimized by default).
    optimizePackageImports: ["radix-ui"],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
