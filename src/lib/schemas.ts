import { z } from "zod";

/**
 * Small Zod building blocks shared by feature schemas.
 * Keep this file free of `server-only` / `"use client"` imports.
 */

/** Backend timestamps: accepts "…Z", "…+00:00" and offset-less values. Stays a string (serializable). */
export const isoDateTime = z.iso.datetime({ offset: true, local: true });

/** Mirrors the backend `skill_level` enum. */
export const skillLevelSchema = z.enum(["beginner", "intermediate", "advanced"]);
export type SkillLevel = z.infer<typeof skillLevelSchema>;
