"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

import { registerAction } from "../actions";
import { AFTER_AUTH_PATH, registerSchema } from "../auth-schemas";
import { AuthField, fieldErrors, type FieldErrors } from "./auth-form-fields";

export function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = registerSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error.issues));
      return;
    }

    setErrors({});
    setFormError(undefined);
    startTransition(async () => {
      const result = await registerAction(parsed.data);
      if (!result.ok) {
        setFormError(result.error);
        return;
      }
      router.replace(AFTER_AUTH_PATH);
      router.refresh();
    });
  }

  const clear = (field: string) => () => errors[field] && setErrors((e) => ({ ...e, [field]: undefined }));

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={pending}>
      <FieldGroup>
        {formError ? (
          <Alert variant="destructive">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}
        <AuthField name="name" label="Name" autoComplete="name" error={errors.name} onEdit={clear("name")} />
        <AuthField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email}
          onEdit={clear("email")}
        />
        <AuthField
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          error={errors.password}
          onEdit={clear("password")}
        />
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? <Spinner data-icon="inline-start" /> : null}
          Create account
        </Button>
      </FieldGroup>
    </form>
  );
}
