import "server-only";

import { api, ApiError } from "@/lib/api";
import { IssuedCertificate } from "@/lib/contracts";

/** Public lookup by Verification link id. Not cached: the holder's name is live. Null when unknown. */
export async function getCertificate(id: string) {
  try {
    return await api(`/certificates/${encodeURIComponent(id)}`, IssuedCertificate);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
