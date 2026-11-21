import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type ButtonProps = React.ComponentProps<typeof Button>;

/**
 * Icon-only button. `label` is required: it becomes the aria-label and the tooltip,
 * so an icon is never the only way to understand an action.
 */
export function IconButton({
  label,
  size = "icon",
  variant = "ghost",
  tooltip = true,
  children,
  ...props
}: Omit<ButtonProps, "size" | "aria-label"> & {
  label: string;
  size?: "icon" | "icon-sm" | "icon-lg";
  tooltip?: boolean;
}) {
  const button = (
    <Button size={size} variant={variant} aria-label={label} {...props}>
      {children}
    </Button>
  );
  if (!tooltip) return button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
