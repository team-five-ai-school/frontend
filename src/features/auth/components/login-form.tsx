"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

import { loginAction } from "../actions";
import { afterAuthPath, loginSchema } from "../auth-schemas";
import { AuthField, fieldErrors, type FieldErrors } from "./auth-form-fields";
import { onboardingSessionStore } from "@/features/onboarding/session-storage";

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = loginSchema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error.issues));
      return;
    }

    setErrors({});
    setFormError(undefined);
    startTransition(async () => {
      const result = await loginAction(parsed.data);
      if (!result.ok) {
        setFormError(result.error);
        return;
      }
      queryClient.clear(); // cached guest data (e.g. progress = null) must not outlive the login
      // An onboarding taken as a guest in this browser: go to the plan, which links it to the account.
      router.replace(onboardingSessionStore.get() ? "/plan" : afterAuthPath(result.data));
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={pending}>
      <FieldGroup>
        {formError ? (
          <Alert variant="destructive">
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}
        <AuthField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email}
          onEdit={() => errors.email && setErrors((e) => ({ ...e, email: undefined }))}
        />
        <AuthField
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password}
          onEdit={() => errors.password && setErrors((e) => ({ ...e, password: undefined }))}
        />
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? <Spinner data-icon="inline-start" /> : null}
          Log in
        </Button>
      </FieldGroup>
    </form>
  );
}
