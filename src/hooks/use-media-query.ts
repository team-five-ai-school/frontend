import * as React from "react";

/** Subscribes to a CSS media query. Server snapshot: false (render the mobile-first markup). */
export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** ≥ 1024px: the Mentor is a side panel; below it is a bottom sheet. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
