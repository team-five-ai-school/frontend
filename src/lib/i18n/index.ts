/**
 * Minimal i18n without a library: one typed dictionary, t(key, vars) and plural forms.
 * To add a language: create src/lib/i18n/<lang>.ts with the same shape (`satisfies Messages`)
 * and switch `messages` by locale.
 */
import { uk, type Messages } from "./uk";

export const locale = "uk" as const;
const messages: Messages = uk;

type PluralForms = { one: string; few: string; many: string };

type Leaves<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${P}${K}`
    : T[K] extends PluralForms
      ? never
      : Leaves<T[K], `${P}${K}.`>;
}[keyof T & string];

type PluralLeaves<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? never
    : T[K] extends PluralForms
      ? `${P}${K}`
      : PluralLeaves<T[K], `${P}${K}.`>;
}[keyof T & string];

export type MessageKey = Leaves<Messages>;
export type PluralKey = PluralLeaves<Messages>;
type Vars = Record<string, string | number>;

function lookup(key: string): unknown {
  return key.split(".").reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], messages);
}

function format(template: string, vars?: Vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? formatValue(vars[name]) : match,
  );
}

function formatValue(value: string | number) {
  return typeof value === "number" ? new Intl.NumberFormat(locale).format(value) : value;
}

/** t("mentor.thinking"), t("onboarding.stepOf", { current: 2, total: 6 }) */
export function t(key: MessageKey, vars?: Vars): string {
  const value = lookup(key);
  return typeof value === "string" ? format(value, vars) : key;
}

const pluralRules = new Intl.PluralRules(locale);

/** tp("common.hours", 5) → "5 годин". Ukrainian "other" (fractions) uses the "few" form. */
export function tp(key: PluralKey, count: number, vars?: Vars): string {
  const forms = lookup(key) as PluralForms;
  const rule = pluralRules.select(count);
  const form = rule === "one" ? forms.one : rule === "few" || rule === "other" ? forms.few : forms.many;
  return format(form, { count, ...vars });
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/** Deterministic on server and client: fixed time zone. */
export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = { dateStyle: "long" }) {
  return new Intl.DateTimeFormat(locale, { timeZone: "Europe/Kyiv", ...options }).format(new Date(iso));
}
