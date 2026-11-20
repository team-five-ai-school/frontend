/**
 * Single source of truth for product name, copy and URLs.
 * Change these first when the hackathon task is known.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Set automatically by Vercel for production deployments.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Team Five",
  description: "Hackathon project by Team Five, AI School.",
  url: resolveSiteUrl(),
  locale: "uk",
  repo: "https://github.com/team-five-ai-school/frontend",
} as const;
