import { useSyncExternalStore } from "react";

/**
 * The anonymous onboarding session id, kept in localStorage so a reload resumes where the person stopped.
 * Storage can be missing or throw (private mode, blocked site data): every access is guarded and the
 * onboarding simply starts over without it.
 */
const KEY = "team5.onboarding.sessionId";
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

export const onboardingSessionStore = {
  get(): string | null {
    try {
      return window.localStorage.getItem(KEY);
    } catch {
      return null;
    }
  },
  set(id: string) {
    try {
      window.localStorage.setItem(KEY, id);
    } catch {
      // Not persisted: the flow still works, it just won't survive a reload.
    }
    notify();
  },
  clear() {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      // Nothing to clear.
    }
    notify();
  },
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/** The stored session id: `undefined` during SSR/hydration, then `string | null`. */
export function useStoredSessionId(): string | null | undefined {
  return useSyncExternalStore(subscribe, onboardingSessionStore.get, () => undefined);
}
