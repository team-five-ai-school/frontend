import { CircleAlertIcon, InboxIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Empty view: always explains what goes here and offers the next action. */
export function EmptyState({
  title = t("state.emptyTitle"),
  description,
  icon = <InboxIcon />,
  action,
  className,
}: {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <Empty className={cn("border border-dashed", className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="size-11 rounded-xl [&_svg:not([class*='size-'])]:size-5">
          {icon}
        </EmptyMedia>
        <EmptyTitle className="text-lg font-medium">{title}</EmptyTitle>
        {description && <EmptyDescription className="text-base">{description}</EmptyDescription>}
      </EmptyHeader>
      {action && <EmptyContent>{action}</EmptyContent>}
    </Empty>
  );
}

/** Error view: says what happened in plain words and how to recover. */
export function ErrorState({
  title = t("state.errorTitle"),
  description = t("state.errorDescription"),
  onRetry,
  retrying = false,
  compact = false,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retrying?: boolean;
  /** Inline variant for small areas (a card, a chat message). */
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <div
        role="alert"
        className={cn(
          "flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg bg-destructive-soft px-3 py-2 text-destructive-strong",
          className,
        )}
      >
        <CircleAlertIcon className="size-5 shrink-0" aria-hidden />
        <span className="min-w-0 flex-1 text-sm">{title}</span>
        {onRetry && (
          <Button size="sm" variant="ghost" onClick={onRetry} loading={retrying}>
            {!retrying && <RotateCcwIcon data-icon="inline-start" aria-hidden />}
            {t("common.retry")}
          </Button>
        )}
      </div>
    );
  }
  return (
    <Empty role="alert" className={cn("border border-dashed", className)}>
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-11 rounded-xl bg-destructive-soft text-destructive-strong [&_svg:not([class*='size-'])]:size-5"
        >
          <CircleAlertIcon aria-hidden />
        </EmptyMedia>
        <EmptyTitle className="text-lg font-medium">{title}</EmptyTitle>
        <EmptyDescription className="text-base">{description}</EmptyDescription>
      </EmptyHeader>
      {onRetry && (
        <EmptyContent>
          <Button variant="outline" onClick={onRetry} loading={retrying}>
            {!retrying && <RotateCcwIcon data-icon="inline-start" aria-hidden />}
            {t("common.retry")}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
