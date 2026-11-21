"use client";

import { useEffect } from "react";

/** Registers the minimal /sw.js that makes the app installable. Renders nothing. Mounted once in <Providers>. */
export function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch((error) => {
      console.error("Service worker registration failed", error);
    });
  }, []);
  return null;
}
