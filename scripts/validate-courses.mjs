#!/usr/bin/env node
/**
 * Validates course files against content/FORMAT.md.
 *   npm run courses:check                 # all files in content/courses
 *   npm run courses:check -- path/to.md   # one file
 * Exit code 1 on errors. Warnings (budget overruns) do not fail.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { parse } from "yaml";

const TRACKS = ["general", "marketing", "hr", "teachers", "lawyers", "small-business"];
const TYPES = ["single_select", "multi_select", "fill_blank", "true_false"];
const PLACEHOLDERS = new Set(["role", "pain", "tool"]);

const words = (s = "") => String(s).split(/\s+/).filter(Boolean).length;

function validate(file, text) {
  const errors = [];
  const warnings = [];
  const info = [];
  const err = (m) => errors.push(m);
  const warn = (m) => warnings.push(m);

  const fm = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) return { errors: ["missing YAML frontmatter"], warnings };
  let meta;
  try {
    meta = parse(fm[1]);
  } catch (e) {
    return { errors: [`frontmatter: ${e.message}`], warnings };
  }
  for (const k of [
    "id",
    "title",
    "track",
    "level",
    "description",
    "skills",
    "certificate",
    "minutes_saved_per_week",
  ])
    if (meta[k] === undefined) err(`frontmatter: missing "${k}"`);
  if (meta.id && path.basename(file, ".md") !== meta.id)
    err(`frontmatter: id "${meta.id}" must match file name`);
  if (meta.track && !TRACKS.includes(meta.track))
    err(`frontmatter: track "${meta.track}" not in ${TRACKS.join("|")}`);
  const courseSkills = new Set(meta.skills ?? []);

  const lessons = text.split(/\n## Lesson \d+: /).slice(1);
  if (lessons.length !== 3) err(`expected 3 lessons, found ${lessons.length}`);
  const ids = new Set();

  lessons.forEach((body, li) => {
    const L = `lesson ${li + 1}`;
    const blocks = [...body.matchAll(/```yaml (lesson|exercise|practice|mentor)\n([\s\S]*?)\n```/g)].map(
      (m) => {
        try {
          return { kind: m[1], data: parse(m[2]) };
        } catch (e) {
          err(`${L}: invalid yaml in ${m[1]} block: ${e.message.split("\n")[0]}`);
          return { kind: m[1], data: {} };
        }
      },
    );
    const of = (k) => blocks.filter((b) => b.kind === k).map((b) => b.data);
    const [lesson] = of("lesson");
    if (!lesson) err(`${L}: missing lesson block`);
    else {
      if (lesson.id !== `${meta.id}-l${li + 1}`) err(`${L}: lesson id should be "${meta.id}-l${li + 1}"`);
      for (const s of lesson.skills ?? [])
        if (!courseSkills.has(s)) err(`${L}: skill "${s}" not in course skills`);
    }

    const cards = [...body.matchAll(/\n### Card: (.+)\n([\s\S]*?)(?=\n### |\n## |$)/g)];
    if (cards.length < 3 || cards.length > 4) err(`${L}: ${cards.length} cards (need 3–4)`);
    let lessonWords = 0;
    for (const [, title, cardBody] of cards) {
      const w = words(cardBody);
      lessonWords += w;
      if (w > 70) warn(`${L}: card "${title}" has ${w} words (max 70)`);
    }

    const exercises = of("exercise");
    if (exercises.length < 5 || exercises.length > 6) err(`${L}: ${exercises.length} exercises (need 5–6)`);
    const types = new Set();
    exercises.forEach((e, ei) => {
      const E = `${L} exercise ${ei + 1}`;
      types.add(e.type);
      if (!TYPES.includes(e.type)) return err(`${E}: unknown type "${e.type}"`);
      if (!e.id || ids.has(e.id)) err(`${E}: missing or duplicate id`);
      ids.add(e.id);
      if (lesson && !String(e.id).startsWith(`${lesson.id}-e`))
        err(`${E}: id should start with "${lesson.id}-e"`);
      if (e.skill && !courseSkills.has(e.skill)) err(`${E}: skill "${e.skill}" not in course skills`);
      else if (e.skill && lesson?.skills && !lesson.skills.includes(e.skill))
        warn(`${E}: skill "${e.skill}" not in this lesson's skills`);
      for (const k of ["question", "hint", "skill"]) if (!e[k]) err(`${E}: missing "${k}"`);
      lessonWords += words(e.question) + words(e.explanation) + words(e.prompt);
      if (e.type === "true_false") {
        if (!Array.isArray(e.cards) || e.cards.length < 3 || e.cards.length > 5)
          err(`${E}: true_false needs 3–5 cards`);
        for (const c of e.cards ?? []) {
          if (typeof c.answer !== "boolean") err(`${E}: card answer must be true/false`);
          if (!c.statement || !c.explanation) err(`${E}: card needs statement and explanation`);
          lessonWords += words(c.statement) + words(c.explanation);
        }
        return;
      }
      if (!e.explanation) err(`${E}: missing "explanation"`);
      const n = Array.isArray(e.options) ? e.options.length : 0;
      lessonWords += (e.options ?? []).reduce((a, o) => a + words(o), 0);
      if (e.type === "multi_select") {
        if (n < 4 || n > 5) err(`${E}: multi_select needs 4–5 options`);
        if (!Array.isArray(e.answers) || e.answers.length < 2)
          err(`${E}: multi_select needs "answers" with ≥2 indexes`);
        else if (e.answers.some((a) => !Number.isInteger(a) || a < 0 || a >= n))
          err(`${E}: answers out of range`);
      } else {
        if (n < 3 || n > 4) err(`${E}: ${e.type} needs 3–4 options`);
        if (!Number.isInteger(e.answer) || e.answer < 0 || e.answer >= n)
          err(`${E}: "answer" index out of range`);
      }
      if (e.type === "fill_blank" && (String(e.prompt ?? "").match(/___/g) ?? []).length !== 1)
        err(`${E}: fill_blank "prompt" needs exactly one ___`);
    });
    for (const t of TYPES) if (!types.has(t)) err(`${L}: missing exercise type ${t}`);

    const practice = of("practice");
    if (practice.length !== 1) err(`${L}: need exactly 1 practice block`);
    else {
      const p = practice[0];
      for (const k of [
        "id",
        "skill",
        "instructions",
        "task_template",
        "default_context",
        "rubric",
        "example_good_prompt",
      ])
        if (!p[k]) err(`${L} practice: missing "${k}"`);
      for (const [, ph] of String(p.task_template ?? "").matchAll(/\{\{(\w+)\}\}/g))
        if (!PLACEHOLDERS.has(ph)) err(`${L} practice: unknown placeholder {{${ph}}}`);
      if (!Array.isArray(p.rubric) || p.rubric.length < 2) err(`${L} practice: rubric needs ≥2 criteria`);
    }
    const mentor = of("mentor");
    if (mentor.length !== 1) err(`${L}: need exactly 1 mentor block`);
    else
      for (const k of ["common_mistakes", "key_points", "follow_up_tasks"])
        if (!mentor[0][k]?.length) err(`${L} mentor: missing "${k}"`);

    info.push(`${L}: ~${lessonWords} words, ${cards.length} cards, ${exercises.length} exercises`);
    if (lessonWords > 520) warn(`${L}: ~${lessonWords} learner-facing words (target 350–450)`);
    if (lessonWords < 300) warn(`${L}: ~${lessonWords} learner-facing words, too thin (target 350–450)`);
  });
  return { errors, warnings, info };
}

const args = process.argv.slice(2);
const dir = "content/courses";
const files = args.length
  ? args
  : (await readdir(dir)).filter((f) => f.endsWith(".md")).map((f) => path.join(dir, f));
let failed = false;
for (const file of files) {
  const { errors, warnings, info = [] } = validate(file, await readFile(file, "utf8"));
  console.log(
    `${errors.length ? "✖" : "✔"} ${file}${warnings.length ? ` (${warnings.length} warnings)` : ""}`,
  );
  for (const e of errors) console.log(`   error: ${e}`);
  for (const w of warnings) console.log(`   warn:  ${w}`);
  for (const i of info) console.log(`   info:  ${i}`);
  if (errors.length) failed = true;
}
if (!files.length) console.log("No course files found.");
process.exit(failed ? 1 : 0);
