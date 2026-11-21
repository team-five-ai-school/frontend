"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export type FieldErrors = Partial<Record<string, string>>;

/** Collects the first Zod issue per field: `{ email: "Enter a valid email" }`. */
export function fieldErrors(issues: { path: PropertyKey[]; message: string }[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "");
    errors[key] ??= issue.message;
  }
  return errors;
}

/** Labelled input with an inline error, wired for screen readers. */
export function AuthField({
  name,
  label,
  error,
  onEdit,
  ...input
}: React.ComponentProps<typeof Input> & {
  name: string;
  label: string;
  error?: string;
  onEdit?: () => void;
}) {
  const id = `auth-${name}`;
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={onEdit}
        {...input}
      />
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </Field>
  );
}
