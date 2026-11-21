import "server-only";

import { api, ApiError } from "@/lib/api";
import { IssuedCertificate, PlanCertificate } from "@/lib/contracts";

/** Public lookup by Verification link id. Not cached: the holder's name is live. Null when unknown. */
export async function getCertificate(id: string) {
  try {
    return await api(`/certificates/${encodeURIComponent(id)}`, IssuedCertificate);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

/** Public lookup of a final certificate by Verification link id. Null when unknown. */
export async function getPlanCertificate(id: string) {
  try {
    return await api(`/plan-certificates/${encodeURIComponent(id)}`, PlanCertificate);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
