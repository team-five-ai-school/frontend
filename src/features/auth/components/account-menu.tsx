import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "@/lib/i18n";

import { getCurrentUser } from "../data";
import { ProfileMenu } from "./profile-menu";

/**
 * Header account slot: "Log in" for guests, the profile menu for a logged-in user (plus a link to the
 * onboarding while it is not done).
 * Reads the session cookie (request-time data), so render it inside <Suspense fallback={<AccountMenuSkeleton />}>.
 */
export async function AccountMenu() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <Button asChild size="sm">
        <Link href="/login">Log in</Link>
      </Button>
    );
  }
  // Until the onboarding is done, keep it one click away on every page.
  if (!user.onboardingCompletedAt) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/onboarding">{t("plan.emptyAction")}</Link>
        </Button>
        <ProfileMenu name={user.name} email={user.email} />
      </div>
    );
  }
  return <ProfileMenu name={user.name} email={user.email} />;
}

export function AccountMenuSkeleton() {
  return <Skeleton className="size-8 rounded-full" />;
}
