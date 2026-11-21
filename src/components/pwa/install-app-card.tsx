"use client";

import { BellIcon, DownloadIcon, ShareIcon, SquarePlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePushSubscription } from "@/hooks/use-push-subscription";
import { usePwaInstall } from "@/hooks/use-pwa-install";

/**
 * OPTIONAL "install the app" step for the end of onboarding. Never block the user on it:
 * the app works the same in a browser tab. Render it only where the user can skip it, and
 * skip the whole step when `usePwaInstall().available` is false (desktop Firefox, already installed).
 *
 *   <InstallAppCard onDone={goToNextStep} />
 */
export function InstallAppCard({ onDone }: { onDone: () => void }) {
  const { installed, isIOS, canPrompt, install } = usePwaInstall();
  const push = usePushSubscription();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add the app to your home screen</CardTitle>
        <CardDescription>
          Optional. Open lessons in one tap and get a reminder for today&apos;s lesson. You can always keep
          using it in the browser.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {canPrompt ? (
          <Button onClick={async () => (await install()) === "accepted" && onDone()} className="w-fit">
            <DownloadIcon data-icon="inline-start" />
            Install app
          </Button>
        ) : null}

        {isIOS && !installed ? (
          <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <ShareIcon className="size-4 shrink-0" /> Tap Share in Safari&apos;s toolbar
            </li>
            <li className="flex items-center gap-2">
              <SquarePlusIcon className="size-4 shrink-0" /> Choose &ldquo;Add to Home Screen&rdquo;
            </li>
          </ol>
        ) : null}

        {/* On iOS, push only works inside the installed app. */}
        {push.supported && (!isIOS || installed) && push.status !== "subscribed" ? (
          <Button
            variant="outline"
            className="w-fit"
            onClick={push.subscribe}
            disabled={push.status === "pending"}
          >
            <BellIcon data-icon="inline-start" />
            Remind me about lessons
          </Button>
        ) : null}
        {push.status === "subscribed" ? (
          <p className="text-sm text-muted-foreground">Reminders are on.</p>
        ) : null}
        {push.status === "denied" ? (
          <p className="text-sm text-muted-foreground">
            Notifications are blocked. You can allow them later in your browser settings.
          </p>
        ) : null}
      </CardContent>

      <CardFooter>
        <Button variant="ghost" onClick={onDone}>
          Not now
        </Button>
      </CardFooter>
    </Card>
  );
}
