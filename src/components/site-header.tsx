import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { routes, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="font-heading font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 text-sm text-muted-foreground">
          {routes
            .filter((route) => route.nav)
            .map((route) => (
              <Link key={route.href} href={route.href} className="transition-colors hover:text-foreground">
                {route.label}
              </Link>
            ))}
        </nav>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
