import { cn } from "@/lib/utils";

/** Building blocks for the /design-system preview page only. */

export function PreviewSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex scroll-mt-20 flex-col gap-6 border-t pt-10"
    >
      <header className="flex max-w-prose flex-col gap-2">
        <h2 id={`${id}-title`} className="text-2xl font-bold">
          {title}
        </h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </header>
      {children}
    </section>
  );
}

/** One component or state with a caption. */
export function Specimen({
  label,
  children,
  className,
  wide = false,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <figure className={cn("flex min-w-0 flex-col gap-3", wide && "sm:col-span-2 lg:col-span-full")}>
      <figcaption className="text-sm text-muted-foreground">{label}</figcaption>
      <div className={cn("flex min-w-0 flex-wrap items-start gap-3", className)}>{children}</div>
    </figure>
  );
}

export function SpecimenGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3", className)}>{children}</div>
  );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-medium">{children}</h3>;
}
