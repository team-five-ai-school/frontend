"use client";

import { useState, useSyncExternalStore } from "react";
import { z } from "zod";

import { apiClient } from "@/lib/api-client";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64: string) {
  const padded = (base64 + "=".repeat((4 - (base64.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

const noopSubscribe = () => () => {};
const isSupportedNow = () =>
  Boolean(VAPID_PUBLIC_KEY) &&
  "serviceWorker" in navigator &&
  "PushManager" in window &&
  "Notification" in window;

/**
 * Optional lesson reminders via Web Push.
 * The backend stores the subscription (POST /push/subscriptions) and sends notifications with
 * its VAPID private key. On iOS, push works only after the app is installed to the home screen.
 * Hidden entirely when NEXT_PUBLIC_VAPID_PUBLIC_KEY is not set.
 */
export function usePushSubscription() {
  const supported = useSyncExternalStore(noopSubscribe, isSupportedNow, () => false);
  const [status, setStatus] = useState<"idle" | "pending" | "subscribed" | "denied" | "error">("idle");

  async function subscribe() {
    if (!supported || !VAPID_PUBLIC_KEY) return;
    setStatus("pending");
    try {
      if ((await Notification.requestPermission()) !== "granted") {
        setStatus("denied");
        return;
      }
      const registration = await navigator.serviceWorker.ready;
      const subscription =
        (await registration.pushManager.getSubscription()) ??
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        }));
      await apiClient("/push/subscriptions", z.unknown(), { method: "POST", body: subscription.toJSON() });
      setStatus("subscribed");
    } catch (error) {
      console.error("Push subscription failed", error);
      setStatus("error");
    }
  }

  return { supported, status, subscribe };
}
