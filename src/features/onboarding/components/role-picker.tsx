"use client";

import {
  BriefcaseBusinessIcon,
  Building2Icon,
  CalculatorIcon,
  GraduationCapIcon,
  StoreIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react";

import { ChoiceCards } from "@/components/choice-cards";
import type { Role, RoleId } from "@/lib/contracts";
import { t } from "@/lib/i18n";

const roleIcon: Record<RoleId, LucideIcon> = {
  accountant: CalculatorIcon,
  sales_manager: BriefcaseBusinessIcon,
  business_owner: StoreIcon,
  office_manager: Building2Icon,
  teacher: GraduationCapIcon,
  other: UserRoundIcon,
};

/** First onboarding step: «Чим ти займаєшся на роботі?» */
export function RolePicker({
  roles,
  value,
  onChange,
  className,
}: {
  roles: Role[];
  value: RoleId | null;
  onChange: (role: RoleId) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold">{t("onboarding.rolePickerTitle")}</h2>
      <p className="mt-1 mb-5 text-muted-foreground">{t("onboarding.rolePickerHint")}</p>
      <ChoiceCards
        name="role"
        type="single"
        legend={t("onboarding.rolePickerTitle")}
        hideLegend
        columns={2}
        value={value ? [value] : []}
        onChange={([id]) => onChange(id as RoleId)}
        options={roles.map((role) => {
          const Icon = roleIcon[role.id];
          return {
            id: role.id,
            label: role.title,
            description: role.description,
            icon: <Icon aria-hidden />,
          };
        })}
      />
    </div>
  );
}
