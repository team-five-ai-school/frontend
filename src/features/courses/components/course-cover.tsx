import {
  BookOpenCheckIcon,
  BookOpenIcon,
  BotIcon,
  BriefcaseIcon,
  FileSpreadsheetIcon,
  GraduationCapIcon,
  type LucideIcon,
  MegaphoneIcon,
  MessageSquareTextIcon,
  MessagesSquareIcon,
  PresentationIcon,
  RepeatIcon,
  ScaleIcon,
  ShieldCheckIcon,
  StoreIcon,
  UsersIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/** One drawing per course. Unknown ids fall back to a book, so new courses still get a cover. */
const icons: Record<string, LucideIcon> = {
  "ai-agents-at-work": BotIcon,
  "ai-assistants-101": MessageSquareTextIcon,
  "ai-for-hr": UsersIcon,
  "ai-for-lawyers": ScaleIcon,
  "ai-for-marketing": MegaphoneIcon,
  "ai-for-small-business": StoreIcon,
  "ai-for-teachers": GraduationCapIcon,
  "ai-in-office-tools": BriefcaseIcon,
  "automate-your-routine": RepeatIcon,
  "chatgpt-for-work": MessagesSquareIcon,
  "gemini-in-google-workspace": FileSpreadsheetIcon,
  "microsoft-365-copilot": PresentationIcon,
  "research-with-sources": BookOpenCheckIcon,
  "safe-ai-at-work": ShieldCheckIcon,
};

/** A few desk arrangements; each course picks one from its id, so covers differ but stay stable. */
const layouts = [
  {
    back: "-rotate-6 left-[12%] top-[18%]",
    front: "rotate-3 right-[14%] top-[14%]",
    strip: "left-[8%] bottom-[12%] rotate-2",
  },
  {
    back: "rotate-6 right-[10%] top-[20%]",
    front: "-rotate-2 left-[16%] top-[12%]",
    strip: "right-[8%] bottom-[14%] -rotate-3",
  },
  {
    back: "-rotate-3 right-[18%] top-[10%]",
    front: "rotate-2 left-[12%] top-[22%]",
    strip: "left-[30%] bottom-[8%] -rotate-1",
  },
] as const;

function hash(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

/**
 * Course cover drawn from design-system pieces (desk, paper sheets, ballpoint ink, pencil hatching),
 * so it follows the theme in light and dark mode and costs no image bytes.
 * Decorative: the course title next to it carries the meaning.
 */
export function CourseCover({ courseId, className }: { courseId: string; className?: string }) {
  const Icon = icons[courseId] ?? BookOpenIcon;
  const layout = layouts[hash(courseId) % layouts.length];
  return (
    <div aria-hidden className={cn("relative aspect-[2/1] overflow-hidden bg-desk", className)}>
      {/* Back sheet: squared notebook paper. */}
      <div
        className={cn(
          "absolute h-[70%] w-[46%] rounded-sm border border-line squared shadow-paper",
          layout.back,
        )}
      />
      {/* Pencil strip: the part AI takes over. */}
      <div className={cn("absolute h-[14%] w-[34%] rounded-sm border border-ai/40 hatch", layout.strip)} />
      {/* Front sheet with the course drawing in ballpoint ink. */}
      <div
        className={cn(
          "absolute flex h-[72%] w-[42%] items-center justify-center rounded-sm border border-line bg-paper shadow-paper",
          layout.front,
        )}
      >
        <Icon className="size-[46%] text-ballpoint" strokeWidth={1.4} />
      </div>
    </div>
  );
}
