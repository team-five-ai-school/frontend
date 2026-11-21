import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { getCurrentUser } from "../data";
import { ProfileMenu } from "./profile-menu";

/**
 * Header account slot: "Log in" for guests, the profile menu for a logged-in user.
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
  return <ProfileMenu name={user.name} email={user.email} />;
}

export function AccountMenuSkeleton() {
  return <Skeleton className="size-8 rounded-full" />;
}
