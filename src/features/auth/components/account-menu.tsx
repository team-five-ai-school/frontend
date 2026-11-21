import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "@/lib/i18n";

import { getCurrentUser } from "../data";
import { ProfileMenu } from "./profile-menu";

/**
 * Header account slot. The onboarding link is shown to guests and to users who have not finished it;
 * it is not in the nav, so it disappears once the onboarding is done.
 * Reads the session cookie (request-time data), so render it inside <Suspense fallback={<AccountMenuSkeleton />}>.
 */
export async function AccountMenu() {
  const user = await getCurrentUser();
  if (!user) {
    // Guests can take the onboarding before signing up; it is linked to the account afterwards.
    return (
      <div className="flex items-center gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/onboarding">
            <OnboardingLinkLabel />
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }
  // Until the onboarding is done, keep it one click away on every page.
  if (!user.onboardingCompletedAt) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/onboarding">
            <OnboardingLinkLabel />
          </Link>
        </Button>
        <ProfileMenu name={user.name} email={user.email} />
      </div>
    );
  }
  return <ProfileMenu name={user.name} email={user.email} />;
}

/** Full label from `sm` up, a short one on phones so the header fits at 360px. */
function OnboardingLinkLabel() {
  return (
    <>
      <span className="sm:hidden">{t("onboarding.headerLink")}</span>
      <span className="hidden sm:inline">{t("plan.emptyAction")}</span>
    </>
  );
}

export function AccountMenuSkeleton() {
  return <Skeleton className="size-8 rounded-full" />;
}
