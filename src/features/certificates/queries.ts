"use client";

import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";
import { IssuedCertificate, PlanCertificate } from "@/lib/contracts";

/** The learner's certificates, or null when not logged in. */
export const certificatesQuery = queryOptions({
  queryKey: ["certificates"] as const,
  queryFn: async () => {
    try {
      return await apiClient("/certificates", z.array(IssuedCertificate));
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) return null;
      throw error;
    }
  },
  staleTime: 30_000,
});

/** The learner's final certificates (one per completed learning plan), or null when not logged in. */
export const planCertificatesQuery = queryOptions({
  queryKey: ["plan-certificates"] as const,
  queryFn: async () => {
    try {
      return await apiClient("/plan-certificates", z.array(PlanCertificate));
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) return null;
      throw error;
    }
  },
  staleTime: 30_000,
});
