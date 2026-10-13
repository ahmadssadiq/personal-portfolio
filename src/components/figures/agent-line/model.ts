// The model: a job is a pure function of time. Everything the figure shows (the cart,
// the drawer, the key, the pens, the readout) is read from it, so none of them can
// disagree. No DOM in here.

import { GATE_X, HOME_X, JAM_X, OUT_X, PRESS_X, TOOL_X } from "./layout";

// Four-bit agent identities: the same pattern is on the plate, the key and the stamp.
export const AGENTS = [3, 5, 6, 9];
export const TOOLS = TOOL_X.length;

export interface Job {
  id: number;
  agent: number;
  tool: number;
  bad: boolean;
}

export type Phase = "planning" | "tool" | "checking" | "rejected" | "repair" | "passed" | "sealing" | "delivered";

export interface Ev {
  at: number;
  pen: number;
  size: number;
  hold?: number;
}

export interface Pose {
  x: number;
  drawer: number;
  tall: number;
  lamp: boolean;
  key: number;
  ram: number;
  stamp: number;
  phase: Phase;
}

export interface Script {
  duration: number;
  events: Ev[];
  at(t: number): Pose;
}

type Key = [number, number];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const u = clamp01(value);
  return u * u * (3 - 2 * u);
};

function track(keys: Key[]) {
  return (t: number) => {
    const first = keys[0]!;
    if (t <= first[0]) return first[1];
    for (let index = 0; index < keys.length - 1; index++) {
      const [t0, v0] = keys[index]!;
      const [t1, v1] = keys[index + 1]!;
      if (t < t1) return t1 > t0 ? v0 + (v1 - v0) * smooth((t - t0) / (t1 - t0)) : v1;
    }
    return keys[keys.length - 1]![1];
  };
}

const drive = (from: number, to: number) => 0.45 + Math.abs(to - from) / 75;

// The time a smoothstep move from `a` to `b` (starting at t0, lasting d) passes `at`.
function crossing(t0: number, d: number, a: number, b: number, at: number) {
  const want = clamp01((at - a) / (b - a));
  let low = 0;
  let high = 1;
  for (let step = 0; step < 24; step++) {
    const mid = (low + high) / 2;
    if (smooth(mid) < want) low = mid;
    else high = mid;
  }
  return t0 + d * ((low + high) / 2);
}

export function scriptOf(job: Job): Script {
  const x: Key[] = [[0, HOME_X]];
  const drawer: Key[] = [[0, 0]];
  const tall: Key[] = [[0, 0]];
  const key: Key[] = [[0, 0]];
  const ram: Key[] = [[0, 1]];
  const stamp: Key[] = [[0, 0]];
  const lamp: [number, number][] = [];
  const phases: [number, Phase][] = [[0, "planning"]];
  const events: Ev[] = [{ at: 0.15, pen: 0, size: 3 }];
  let t = 0.3;

  const move = (from: number, to: number, scale = 1) => {
    const d = drive(from, to) * scale;
    x.push([t, from], [t + d, to]);
    const started = t;
    t += d;
    return { started, d };
  };

  // 1. The planner picks a tool: the cart stops at its drawer and the drawer opens.
  const stop = TOOL_X[job.tool]!;
  move(HOME_X, stop);
  phases.push([t, "tool"]);
  drawer.push([t, 0], [t + 0.45, 1], [t + 0.8, 1], [t + 1.25, 0]);
  events.push({ at: t + 0.45, pen: 0, size: 6 });
  if (job.bad) tall.push([t + 0.7, 0], [t + 1.2, 1]);
  t += 1.45;

  // 2. The gate. A card with a field that doesn't fit stops at the bridge, goes back, is repaired.
  let from = stop;
  phases.push([t, "checking"]);
  if (job.bad) {
    move(stop, JAM_X);
    events.push({ at: t, pen: 1, size: 9, hold: 0.9 });
    lamp.push([t, t + 1.05]);
    phases.push([t, "rejected"]);
    t += 1.15;
    move(JAM_X, HOME_X, 0.85);
    phases.push([t, "repair"]);
    tall.push([t, 1], [t + 0.5, 0]);
    t += 0.75;
    from = HOME_X;
  }
  const run = move(from, PRESS_X);
  const cross = crossing(run.started, run.d, from, PRESS_X, GATE_X);
  events.push({ at: cross, pen: 1, size: 5 });
  phases.push([cross, "passed"]);

  // 3. The press: the key turns, the ram comes down, the seal is stamped, the ram goes back.
  phases.push([t, "sealing"]);
  key.push([t, 0], [t + 0.45, 1], [t + 1.5, 1], [t + 1.9, 0]);
  ram.push([t + 0.5, 1], [t + 0.8, 0], [t + 0.95, 0], [t + 1.4, 1]);
  stamp.push([t + 0.78, 0], [t + 0.92, 1]);
  events.push({ at: t + 0.8, pen: 2, size: 7 });
  t += 2;

  // 4. Out of the line, then the cart goes home and takes a fresh card.
  move(PRESS_X, OUT_X);
  phases.push([t, "delivered"]);
  events.push({ at: t, pen: 3, size: 4 });
  t += 0.6;
  move(OUT_X, HOME_X, 0.8);
  stamp.push([t, 1], [t + 0.3, 0]);
  t += 0.4;

  const xs = track(x);
  const ds = track(drawer);
  const ts = track(tall);
  const ks = track(key);
  const rs = track(ram);
  const ss = track(stamp);

  return {
    duration: t,
    events,
    at(time: number): Pose {
      let phase: Phase = "planning";
      for (const [from_, name] of phases) if (time >= from_) phase = name;
      return {
        x: xs(time),
        drawer: ds(time),
        tall: ts(time),
        lamp: lamp.some(([a, b]) => time >= a && time < b),
        key: ks(time),
        ram: rs(time),
        stamp: ss(time),
        phase,
      };
    },
  };
}

export const REST: Pose = { x: HOME_X, drawer: 0, tall: 0, lamp: false, key: 0, ram: 1, stamp: 0, phase: "planning" };

// A pen's deflection (world units, along the paper) from the events logged for it.
const RISE = 0.12;
const FALL = 0.45;

export function deflection(log: Ev[], pen: number, time: number) {
  let sum = 0;
  for (const event of log) {
    if (event.pen !== pen) continue;
    const age = time - event.at;
    if (age < 0) continue;
    const hold = event.hold ?? 0;
    if (age < RISE) sum += event.size * smooth(age / RISE);
    else if (age < RISE + hold) sum += event.size;
    else {
      const value = event.size * Math.exp(-(age - RISE - hold) / FALL);
      if (value > 0.01) sum += value;
    }
  }
  return sum;
}

const pad = (value: number, width: number) => String(value).padStart(width, "0");
export const tagOf = (job: Job) => `#${pad(job.id, 4)} · agent ${pad(job.agent, 2)}`;

export function readoutOf(job: Job | null, phase: Phase, script: Script | null, next: { tool: number; bad: boolean }, running = true) {
  const queued = `tool ${next.tool + 1} next${next.bad ? " · bad card" : ""}`;
  if (!job) return `idle · ${queued}`;
  if (!running) return `${script?.events.length ?? 0} events traced · ${queued}`;
  const tag = tagOf(job);
  switch (phase) {
    case "planning":
      return `${tag} · planning`;
    case "tool":
      return `${tag} · tool ${job.tool + 1} called`;
    case "checking":
      return `${tag} · checking schema`;
    case "rejected":
      return `${tag} · schema failed`;
    case "repair":
      return `${tag} · repairing output`;
    case "passed":
      return `${tag} · schema ok`;
    case "sealing":
      return `${tag} · sealing`;
    case "delivered":
      return `${tag} · ${script?.events.length ?? 0} events traced`;
  }
}

export function spokenOf(job: Job | null, phase: Phase, script: Script | null, next: { tool: number; bad: boolean }) {
  if (!job) return `Idle. Tool ${next.tool + 1} is next${next.bad ? ", with a malformed card" : ""}.`;
  const who = `Job ${job.id}, agent ${job.agent}`;
  switch (phase) {
    case "planning":
      return `${who}: planning.`;
    case "tool":
      return `${who}: calling tool ${job.tool + 1}.`;
    case "checking":
      return `${who}: checking the output against the schema.`;
    case "rejected":
      return `${who}: the output does not fit the schema and is sent back.`;
    case "repair":
      return `${who}: output repaired, trying again.`;
    case "passed":
      return `${who}: output fits the schema.`;
    case "sealing":
      return `${who}: sealing with the agent's key.`;
    case "delivered":
      return `${who}: delivered. ${script?.events.length ?? 0} events traced.`;
  }
}
