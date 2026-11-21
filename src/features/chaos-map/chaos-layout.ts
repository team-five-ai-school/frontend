/**
 * Pure geometry for <ChaosMap>. Two orientations × two modes:
 *   h = horizontal (container ≥ 672px): x/y in % of a 16:10 box.
 *   v = vertical (phones): x in %, y in px of a box with height `vHeight`.
 *   now = every task points at the person (chaos); ai = tasks sorted into flow lanes,
 *   AI-handled work stays in the lane, only decisions reach the person (order).
 * Deterministic (hash of ids), so server and client render the same markup.
 */
import type { ChaosFlow, ChaosMapData, ChaosTask } from "@/lib/contracts";

export type Point = { x: number; y: number };
export type ChipPos = Point & { rotate: number };

export type TaskGeometry = {
  task: ChaosTask;
  isDecision: boolean;
  h: { now: ChipPos; ai: ChipPos };
  v: { now: ChipPos; ai: ChipPos };
};

export type LaneGeometry = {
  flow: ChaosFlow;
  /** Band rectangle and the AI node. */
  h: { top: number; height: number; left: number; width: number; node: Point };
  v: { top: number; height: number; node: Point };
};

export type ChaosLayout = {
  tasks: TaskGeometry[];
  lanes: LaneGeometry[];
  person: { h: Point; v: Point };
  decisionsLabel: { h: Point; v: Point } | null;
  vHeight: number;
};

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
/** Deterministic value in [-1, 1]. */
const jitter = (seed: string) => ((hash(seed) % 2001) - 1000) / 1000;

// Vertical metrics (px).
const V_ROW = 72;
const V_LANE_HEADER = 48;
const V_GAP = 16;
const V_PERSON_BLOCK = 136;
const V_COLS = [26.5, 73.5];

export function layoutChaosMap(data: ChaosMapData): ChaosLayout {
  const { tasks, flows } = data;
  const decisions = tasks.filter((t) => t.handler === "you");
  const laneTasks = (flowId: string) => tasks.filter((t) => t.flowId === flowId && t.handler !== "you");

  /* ── Horizontal ── */
  const hPerson = { x: 92, y: 50 };
  const hCols = 4;
  const hRows = Math.max(3, Math.ceil(tasks.length / hCols));
  // Shuffle cells deterministically so "now" looks scattered, not sorted by flow.
  const cells = Array.from({ length: hCols * hRows }, (_, i) => i).sort(
    (a, b) => hash(`c${a}`) - hash(`c${b}`),
  );
  const hNow = (t: ChaosTask, i: number): ChipPos => {
    const cell = cells[i % cells.length];
    const col = cell % hCols;
    const row = Math.floor(cell / hCols);
    return {
      x: 11 + col * 18 + jitter(`${t.id}x`) * 1,
      y: ((row + 0.5) / hRows) * 84 + 8 + jitter(`${t.id}y`) * 6,
      rotate: jitter(`${t.id}r`) * 4,
    };
  };

  const laneCount = Math.max(flows.length, 1);
  const laneH = 88 / laneCount;
  const hLane = (i: number) => ({ top: 6 + laneH * i, height: laneH - 2 });

  /* ── Vertical ── */
  let vy = V_GAP;
  const vLanes = flows.map((flow) => {
    const n = laneTasks(flow.id).length;
    const rows = Math.max(1, Math.ceil(n / 2));
    const top = vy;
    const height = V_LANE_HEADER + rows * V_ROW + 8;
    vy += height + V_GAP;
    return { top, height, node: { x: 97, y: top + V_LANE_HEADER / 2 } };
  });
  const vDecisionsTop = vy;
  const decisionRows = Math.ceil(decisions.length / 2);
  const vDecisionsHeight = decisions.length ? 36 + decisionRows * V_ROW : 0;
  const vAiHeight = vDecisionsTop + vDecisionsHeight + V_PERSON_BLOCK;

  const nowRows = Math.ceil(tasks.length / 2);
  const vNowHeight = V_GAP + 24 + nowRows * (V_ROW + 8) + V_PERSON_BLOCK;
  const vHeight = Math.max(vAiHeight, vNowHeight);
  const vPerson = { x: 50, y: vHeight - 64 };
  // "Now" chips spread over the whole area above the person, so the chaos fills the box.
  const nowTop = V_GAP + 24 + V_ROW / 2;
  const nowBottom = vHeight - V_PERSON_BLOCK - V_ROW;
  const nowStep = nowRows > 1 ? (nowBottom - nowTop) / (nowRows - 1) : 0;

  const vNow = (t: ChaosTask, i: number): ChipPos => ({
    x: V_COLS[i % 2] + jitter(`${t.id}vx`) * 3,
    y: nowTop + Math.floor(i / 2) * nowStep + (i % 2) * (nowStep / 3) + jitter(`${t.id}vy`) * 10,
    rotate: jitter(`${t.id}r`) * 4,
  });

  /* ── Assign task positions ── */
  const geometry: TaskGeometry[] = tasks.map((task, i) => {
    const isDecision = task.handler === "you";
    let hAi: ChipPos;
    let vAi: ChipPos;
    if (isDecision) {
      const d = decisions.indexOf(task);
      hAi = {
        x: 77,
        y: 50 + (d - (decisions.length - 1) / 2) * Math.min(22, 70 / decisions.length),
        rotate: 0,
      };
      vAi = {
        x: V_COLS[d % 2],
        y: vDecisionsTop + 36 + Math.floor(d / 2) * V_ROW + V_ROW / 2,
        rotate: 0,
      };
    } else {
      const laneIndex = flows.findIndex((f) => f.id === task.flowId);
      const inLane = laneTasks(task.flowId);
      const j = inLane.indexOf(task);
      const lane = hLane(laneIndex);
      const perRow = 3;
      const rows = Math.ceil(inLane.length / perRow);
      const row = Math.floor(j / perRow);
      hAi = {
        x: 11 + (j % perRow) * 17.5,
        // Lower 70% of the lane: the top strip holds the flow title.
        y: lane.top + lane.height * 0.3 + (lane.height * 0.7 * (row + 0.5)) / rows,
        rotate: 0,
      };
      const vl = vLanes[laneIndex];
      vAi = {
        x: V_COLS[j % 2],
        y: vl.top + V_LANE_HEADER + Math.floor(j / 2) * V_ROW + V_ROW / 2,
        rotate: 0,
      };
    }
    return { task, isDecision, h: { now: hNow(task, i), ai: hAi }, v: { now: vNow(task, i), ai: vAi } };
  });

  const lanes: LaneGeometry[] = flows.map((flow, i) => {
    const lane = hLane(i);
    return {
      flow,
      h: { ...lane, left: 1.5, width: 66.5, node: { x: 62.5, y: lane.top + lane.height * 0.58 } },
      v: vLanes[i],
    };
  });

  return {
    tasks: geometry,
    lanes,
    person: { h: hPerson, v: vPerson },
    decisionsLabel: decisions.length
      ? {
          h: { x: 77, y: 50 - (decisions.length / 2) * Math.min(22, 70 / decisions.length) - 6 },
          v: { x: 4, y: vDecisionsTop + 14 },
        }
      : null,
    vHeight,
  };
}

/** Curved connector; `bend` in [-1, 1] makes "now" lines look tangled. */
export function curve(from: Point, to: Point, bend: number) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const cx = mx - dy * 0.35 * bend;
  const cy = my + dx * 0.35 * bend;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

export { jitter };
