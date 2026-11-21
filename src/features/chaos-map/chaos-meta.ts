import {
  ArrowRightLeftIcon,
  BellRingIcon,
  FileTextIcon,
  InboxIcon,
  MessagesSquareIcon,
  type LucideIcon,
} from "lucide-react";

import type { ChaosType, Handler } from "@/lib/contracts";
import { locale, t } from "@/lib/i18n";

export const chaosIcon: Record<ChaosType, LucideIcon> = {
  scattered_channels: InboxIcon,
  manual_transfer: ArrowRightLeftIcon,
  repetitive_replies: MessagesSquareIcon,
  reports: FileTextIcon,
  status_tracking: BellRingIcon,
};

export const chaosLabel = (type: ChaosType) => t(`chaosMap.chaos.${type}`);

export const handlerLabel: Record<Handler, string> = {
  ai: t("chaosMap.handledByAi"),
  you: t("chaosMap.handledByYou"),
  shared: t("chaosMap.handledShared"),
};

/** Hours with one decimal max, in the app locale: 7.5 → "7.5". */
export function formatHours(hours: number) {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(hours);
}
