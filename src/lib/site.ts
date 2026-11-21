import type { Route } from "next";

/**
 * Single source of truth for product name, copy, URLs and routes.
 * Change these first when the hackathon task is known.
 */

/** "production" | "preview" | "development" on Vercel; undefined locally. */
const vercelEnv = process.env.VERCEL_ENV;

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // System env vars set by Vercel: https://vercel.com/docs/environment-variables/system-environment-variables
  if (vercelEnv === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_BRANCH_URL) return `https://${process.env.VERCEL_BRANCH_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Team Five",
  description: "Hackathon project by Team Five, AI School.",
  url: resolveSiteUrl(),
  locale: "en",
  repo: "https://github.com/team-five-ai-school/frontend",
  /** Only the production deployment may be indexed by search engines. */
  isProduction: vercelEnv === "production",
} as const;

/**
 * Every page route in one place. The header nav and sitemap.xml are generated from it,
 * so adding a page is a one-line change here (fewer merge conflicts than editing several files).
 */
export const routes: { href: Route; label: string; nav: boolean; sitemap: boolean }[] = [
  { href: "/", label: "Home", nav: false, sitemap: true },
  { href: "/courses", label: "Courses", nav: true, sitemap: true },
  { href: "/onboarding", label: "Onboarding", nav: true, sitemap: true },
  { href: "/plan", label: "My plan", nav: true, sitemap: false },
  { href: "/login", label: "Log in", nav: false, sitemap: false },
  { href: "/register", label: "Sign up", nav: false, sitemap: false },
  { href: "/design-system", label: "Design system", nav: false, sitemap: false },
];
