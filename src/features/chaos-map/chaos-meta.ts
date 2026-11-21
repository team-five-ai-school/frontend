import {
  CalendarDaysIcon,
  FileTextIcon,
  MailIcon,
  PenLineIcon,
  SearchIcon,
  Table2Icon,
  type LucideIcon,
} from "lucide-react";

import type { ChaosType, Handler } from "@/lib/contracts";
import { t } from "@/lib/i18n";

export const chaosIcon: Record<ChaosType, LucideIcon> = {
  communication: MailIcon,
  documents: FileTextIcon,
  data: Table2Icon,
  scheduling: CalendarDaysIcon,
  search: SearchIcon,
  content: PenLineIcon,
};

export const chaosLabel = (type: ChaosType) => t(`chaosMap.chaos.${type}`);

export const handlerLabel: Record<Handler, string> = {
  ai: t("chaosMap.handledByAi"),
  you: t("chaosMap.handledByYou"),
  shared: t("chaosMap.handledShared"),
};

/** Hours with one decimal max: 7.5 → "7,5". */
export function formatHours(hours: number) {
  return new Intl.NumberFormat("uk", { maximumFractionDigits: 1 }).format(hours);
}
