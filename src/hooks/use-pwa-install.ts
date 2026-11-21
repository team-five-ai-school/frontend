"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const STANDALONE = "(display-mode: standalone)";

function subscribeStandalone(onChange: () => void) {
  const mql = window.matchMedia(STANDALONE);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const isStandaloneNow = () =>
  window.matchMedia(STANDALONE).matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const noopSubscribe = () => () => {};
// iPadOS reports itself as a Mac, so also check for touch.
const isIOSNow = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.userAgent.includes("Macintosh") && navigator.maxTouchPoints > 1);

/**
 * Install state for the optional "Add to home screen" step.
 * - `installed`: already running as an installed app.
 * - `canPrompt`: Chrome/Edge/Android offer a native install dialog → call `install()`.
 * - `isIOS`: Safari has no install API → show manual instructions (Share → Add to Home Screen).
 * - `available`: there is something to offer at all; if false, skip the onboarding step.
 */
export function usePwaInstall() {
  const installed = useSyncExternalStore(subscribeStandalone, isStandaloneNow, () => false);
  const isIOS = useSyncExternalStore(noopSubscribe, isIOSNow, () => false);
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault(); // we show our own button instead of the browser mini-infobar
      setPromptEvent(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setPromptEvent(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!promptEvent) return "unavailable" as const;
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    setPromptEvent(null);
    return outcome;
  }

  const canPrompt = !installed && promptEvent !== null;
  return { installed, isIOS, canPrompt, available: !installed && (canPrompt || isIOS), install };
}
