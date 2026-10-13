import * as k from "@/components/iso/iso-kit";
import type { Flat, Plan, Plane, Point3, SolidPaths } from "@/components/iso/iso-kit";
import {
  BASE,
  BASE_H,
  BRIDGE_H,
  BRIDGE_Z,
  CARD_D,
  CARD_H,
  CARD_TOP,
  CARD_W,
  CART_D,
  CART_H,
  CART_TOP,
  CART_W,
  CART_Z,
  FOOT_H,
  GATE_X,
  LOCK_Z,
  PAPER_D,
  PAPER_W,
  PAPER_X,
  PAPER_Y,
  PAPER_Z,
  PEN_X,
  PEN_Y,
  POST_FACE_Y,
  PRESS_X,
  RAIL_H,
  RAIL_W,
  RAIL_X0,
  RAIL_X1,
  RAIL_Y,
  RAM_RISE,
  RAM_X,
  RAM_Y,
  RULING,
  SPEED,
  TAB_D,
  TAB_NORMAL,
  TAB_TALL,
  TAB_W,
  TAB_X,
  TAB_Y,
  TOOL_X,
  TRAY_H,
  TRAY_TOP,
  TRAY_Z,
  ZONE,
  BAD_TAB,
  HISTORY,
} from "./layout";
import { deflection, type Ev } from "./model";
import { P, at } from "./view";

const solid = (plan: Plan, z: number, h: number, steps = 5, bevel = 0) => k.slabOf(plan, z, h, P, steps, bevel);
const cyl = (cx: number, cy: number, r: number, z: number, h: number, steps = 28, bevel = 0) => k.cylinder(cx, cy, r, z, h, P, steps, bevel);
const circ = (cx: number, cy: number, r: number, z: number, steps = 32) => k.ring(cx, cy, r, z, P, steps);
const seg = (a: Point3, b: Point3) => k.segment(a, b, P);
const outline = (plan: Plan, z: number, steps = 6) => k.planOutline(plan, z, P, steps);
const join = (paths: string[]) => paths.join("");

// ─── Base ────────────────────────────────────────────────────────────────────

const FEET: Plane[] = [
  [BASE.x + 18, BASE.y + 16],
  [BASE.x + BASE.w - 18, BASE.y + 16],
  [BASE.x + 18, BASE.y + BASE.d - 16],
  [BASE.x + BASE.w - 18, BASE.y + BASE.d - 16],
];
const BASE_SCREWS: Plane[] = k.corners(BASE, 8);
const LABEL: Plan = { x: 84, y: -44, w: 56, d: 11, r: 2 };

export const BASE_ART = {
  halo: solid(BASE, -BASE_H - FOOT_H, BASE_H).fill,
  feet: FEET.map(([x, y]) => [cyl(x, y, 7, -BASE_H - FOOT_H, 1.6), cyl(x, y, 5.5, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6)]),
  slab: solid(BASE, -BASE_H, BASE_H, 8, 1.6),
  groove: outline(k.insetPlan(BASE, 4.5), 0, 8),
  screws: BASE_SCREWS.map(([x, y]) => at([x, y, 0])),
  screwRings: join(BASE_SCREWS.map(([x, y]) => circ(x, y, 2.2, 0, 16))),
  label: solid(LABEL, 0, 0.8, 4),
  labelLine: outline(k.insetPlan(LABEL, 1.6), 0.8, 4),
  labelScrews: [at([LABEL.x + 3.5, LABEL.y + LABEL.d / 2, 0.8]), at([LABEL.x + LABEL.w - 3.5, LABEL.y + LABEL.d / 2, 0.8])],
  labelRule: join([0, 1, 2].map((row) => k.onTop([[LABEL.x + 8, LABEL.y + 3.4 + row * 2.1], [LABEL.x + (row === 1 ? 34 : 44), LABEL.y + 3.4 + row * 2.1]], 0.8, P))),
};

// ─── Tool rack ───────────────────────────────────────────────────────────────

const RACK: Plan = { x: -114, y: -42, w: 83, d: 20, r: 2 };
const WALL_H = 13;

export const RACK_ART = {
  shelf: solid(RACK, 0, TRAY_Z, 5, 0.8),
  slots: TOOL_X.map((cx) => outline({ x: cx - 7.8, y: -38.8, w: 15.6, d: 16.6, r: 1.8 }, TRAY_Z, 6)),
  wall: solid({ x: RACK.x, y: RACK.y, w: RACK.w, d: 3, r: 1 }, TRAY_Z, WALL_H, 3, 0.8),
  wallScrews: [at([RACK.x + 6, RACK.y + 1.5, TRAY_Z + WALL_H]), at([RACK.x + RACK.w - 6, RACK.y + 1.5, TRAY_Z + WALL_H])],
  endLeft: solid({ x: RACK.x, y: -39, w: 3, d: 17, r: 1 }, TRAY_Z, 7, 3, 0.5),
  endRight: solid({ x: RACK.x + RACK.w - 3, y: -39, w: 3, d: 17, r: 1 }, TRAY_Z, 7, 3, 0.5),
};

const TRAY_Y = -38.5;
const TRAY_DEPTH = 14;
const TOOL_Y = TRAY_Y + TRAY_DEPTH / 2;

// Each drawer holds a different tool, so you can tell them apart at a glance.
function toolsOf(index: number, cx: number): SolidPaths[] {
  switch (index) {
    case 0:
      return [cyl(cx, TOOL_Y, 2.6, TRAY_TOP, 5, 20, 0.3)];
    case 1:
      return [solid({ x: cx - 3, y: TOOL_Y - 3, w: 6, d: 6, r: 1 }, TRAY_TOP, 4, 4, 0.4)];
    case 2:
      return [cyl(cx, TOOL_Y, 3.4, TRAY_TOP, 2, 24, 0.3), cyl(cx, TOOL_Y, 1.8, TRAY_TOP + 2, 4.5, 18)];
    default:
      return [
        solid({ x: cx - 4.4, y: TOOL_Y - 1.6, w: 8.8, d: 3.2, r: 0.8 }, TRAY_TOP, 3, 3, 0.3),
        cyl(cx - 2.8, TOOL_Y, 1.3, TRAY_TOP + 3, 4, 14),
        solid({ x: cx + 1.2, y: TOOL_Y - 1.6, w: 2.6, d: 3.2, r: 0.6 }, TRAY_TOP + 3, 2.5, 2),
      ];
  }
}

function trayOf(index: number) {
  const cx = TOOL_X[index]!;
  const plan: Plan = { x: cx - 7, y: TRAY_Y, w: 14, d: TRAY_DEPTH, r: 1.4 };
  return {
    body: solid(plan, TRAY_Z, TRAY_H, 5, 0.5),
    pocket: outline(k.insetPlan(plan, 2.2), TRAY_TOP, 5),
    tools: toolsOf(index, cx),
    handle: solid({ x: cx - 3.5, y: TRAY_Y + TRAY_DEPTH, w: 7, d: 1.6, r: 0.6 }, 3.4, 2.4, 3, 0.3),
    handleLine: k.onTop([[cx - 2, TRAY_Y + TRAY_DEPTH + 1.6], [cx + 2, TRAY_Y + TRAY_DEPTH + 1.6]], 5.8, P),
  };
}

export const TRAY_ART = TOOL_X.map((_, index) => trayOf(index));

// ─── Rail ────────────────────────────────────────────────────────────────────

const RAIL_PLANS: Plan[] = [-1, 1].map((side) => ({ x: RAIL_X0, y: side * RAIL_Y - RAIL_W / 2, w: RAIL_X1 - RAIL_X0, d: RAIL_W, r: 0.8 }));
const RAIL_TICKS = k.topTicks(-132, 132, 4, 5, RAIL_Y - RAIL_W / 2, RAIL_H, [1.4, 2.6], P);

export const RAIL_ART = {
  rails: RAIL_PLANS.map((plan) => solid(plan, 0, RAIL_H, 3, 0.5)),
  stops: [RAIL_X0 - 4, RAIL_X1].map((x) => solid({ x, y: -RAIL_Y - 4, w: 4, d: RAIL_Y * 2 + 8, r: 1 }, 0, 6, 3, 0.5)),
  stopScrews: [RAIL_X0 - 2, RAIL_X1 + 2].flatMap((x) => [at([x, -RAIL_Y, 6]), at([x, RAIL_Y, 6])]),
  ticksMinor: RAIL_TICKS.minor,
  ticksMajor: RAIL_TICKS.major,
  screws: [-120, -60, 0, 60, 120].flatMap((x) => [at([x, -RAIL_Y, RAIL_H]), at([x, RAIL_Y, RAIL_H])]),
};

// ─── Cart and card (built at x = 0, moved with a translate) ──────────────────

const SKIRT_X = [-12.5, 4.5];
const SKIRT: Plan[] = SKIRT_X.flatMap((x) => [-1, 1].map((side) => ({ x, y: side < 0 ? -CART_D / 2 - 3 : CART_D / 2, w: 8, d: 3, r: 0.8 })));
const PLATE: Plan = { x: -CART_W / 2, y: -CART_D / 2, w: CART_W, d: CART_D, r: 3 };
const SEAT: Plan = { x: -12.6, y: -9.1, w: 25.2, d: 18.2, r: 2 };
const CARD: Plan = { x: -CARD_W / 2, y: -CARD_D / 2, w: CARD_W, d: CARD_D, r: 1.6 };
const tabPlan = (index: number): Plan => ({ x: TAB_X[index]!, y: TAB_Y, w: TAB_W, d: TAB_D, r: 0.5 });

export const CART_ART = {
  halo: solid(k.insetPlan(PLATE, 3), 0.8, 0.1).fill,
  skirtsBack: SKIRT.filter((plan) => plan.y < 0).map((plan) => solid(plan, 1, CART_TOP - 1, 3, 0.4)),
  skirtsFront: SKIRT.filter((plan) => plan.y > 0).map((plan) => solid(plan, 1, CART_TOP - 1, 3, 0.4)),
  plate: solid(PLATE, CART_Z, CART_H, 6, 0.8),
  seat: outline(SEAT, CART_TOP, 8),
  rivets: [-1, 1].flatMap((sx) => [-1, 1].map((sy) => at([sx * 13.8, sy * 10.3, CART_TOP]))),
};

export const CARD_ART = {
  card: solid(CARD, CART_TOP, CARD_H, 6, 0.5),
  rules: join([
    [-11, -1, -3],
    [-11, -4, -0.8],
    [-11, -2, 1.4],
    [-11, -6, 3.6],
  ].map(([from, to, y]) => k.onTop([[from!, y!], [to!, y!]], CARD_TOP, P))),
  zone: circ(ZONE[0], ZONE[1], 3.8, CARD_TOP, 32),
};

export const TAB_ART = TAB_X.map((_, index) => solid(tabPlan(index), CARD_TOP, TAB_NORMAL[index]!, 2, 0.3));

// The one field that can come out malformed is rebuilt at its current height.
export function tabOf(tall: number): SolidPaths {
  return k.slabOf(tabPlan(BAD_TAB), CARD_TOP, TAB_NORMAL[BAD_TAB]! + (TAB_TALL - TAB_NORMAL[BAD_TAB]!) * tall, P, 2, 0.3);
}
export const TAB_REST = tabOf(0);

// The seal: a ring and four bit dots, the same pattern as the agent's plate and key.
const BIT_ANGLES = [45, 135, 225, 315].map((degrees) => (degrees * Math.PI) / 180);
const bitAt = (index: number, radius: number): Plane => [ZONE[0] + radius * Math.cos(BIT_ANGLES[index]!), ZONE[1] + radius * Math.sin(BIT_ANGLES[index]!)];

export const STAMP_ART = {
  ring: circ(ZONE[0], ZONE[1], 3.4, CARD_TOP, 32),
  inner: circ(ZONE[0], ZONE[1], 1.1, CARD_TOP, 14),
  dots: BIT_ANGLES.map((_, index) => {
    const [x, y] = bitAt(index, 2.3);
    return at([x, y, CARD_TOP]);
  }),
};

// ─── Gate ────────────────────────────────────────────────────────────────────

const GATE_BACK_PAD: Plan = { x: GATE_X - 6, y: -26, w: 12, d: 11, r: 2 };
const GATE_FRONT_PAD: Plan = { x: GATE_X - 6, y: 15, w: 12, d: 11, r: 2 };
const GATE_BACK_POST: Plan = { x: GATE_X - 4, y: -22.5, w: 8, d: 7.5, r: 1.5 };
const GATE_FRONT_POST: Plan = { x: GATE_X - 4, y: 15.5, w: 8, d: 7.5, r: 1.5 };
const BRIDGE: Plan = { x: GATE_X - 4, y: -22.5, w: 8, d: 45.5, r: 1.5 };
const PAD_H = 1.5;

export const GATE_ART = {
  backPad: solid(GATE_BACK_PAD, 0, PAD_H, 3, 0.4),
  backPost: solid(GATE_BACK_POST, PAD_H, BRIDGE_Z - PAD_H, 4, 0.5),
  backScrews: [at([GATE_X - 4.6, -24, PAD_H]), at([GATE_X + 4.6, -24, PAD_H])],
  frontPad: solid(GATE_FRONT_PAD, 0, PAD_H, 3, 0.4),
  frontPost: solid(GATE_FRONT_POST, PAD_H, BRIDGE_Z - PAD_H, 4, 0.5),
  frontScrews: [at([GATE_X - 4.6, 24.6, PAD_H]), at([GATE_X + 4.6, 24.6, PAD_H])],
  strip: solid({ x: GATE_X - 3.4, y: 23, w: 2, d: 0.6, r: 0.2 }, 3, 13.5, 2),
  ticksMinor: join(
    [5, 7, 9, 11, 13, 15].map((z) => seg([GATE_X - 1.4, 23, z], [GATE_X + 0.2, 23, z])),
  ),
  ticksMajor: join([6, 10, 14].map((z) => seg([GATE_X - 1.4, 23, z], [GATE_X + 1.6, 23, z]))),
  bridge: solid(BRIDGE, BRIDGE_Z, BRIDGE_H, 4, 0.8),
  bridgeLine: outline(k.insetPlan(BRIDGE, 1.4), BRIDGE_Z + BRIDGE_H, 4),
  bridgeRules: join([0, 1, 2].map((row) => k.onTop([[GATE_X - 2.4, 6 + row * 2.4], [GATE_X + (row === 1 ? 0.6 : 2.4), 6 + row * 2.4]], BRIDGE_Z + BRIDGE_H, P))),
  bridgeScrews: [at([GATE_X, -18, BRIDGE_Z + BRIDGE_H]), at([GATE_X, 18, BRIDGE_Z + BRIDGE_H])],
};

// ─── Press ───────────────────────────────────────────────────────────────────

const PRESS_PAD: Plan = { x: PRESS_X - 2, y: -29, w: 16, d: 13, r: 2 };
const PRESS_POST: Plan = { x: PRESS_X, y: -26, w: 12, d: 10, r: 2 };
const PRESS_ARM: Plan = { x: PRESS_X - 1, y: -27, w: 14, d: 38, r: 2.5 };
const ARM_Z = 34;
const ARM_H = 6;
const PLATE_FACE = POST_FACE_Y + 0.7;
const LOCK_PLATE: Plan = { x: RAM_X - 4, y: POST_FACE_Y, w: 8, d: 0.7, r: 0.4 };
const ID_PLATE: Plan = { x: RAM_X - 4, y: POST_FACE_Y, w: 8, d: 0.7, r: 0.4 };
const ID_Z = 25;

export const PRESS_ART = {
  pad: solid(PRESS_PAD, 0, PAD_H, 3, 0.4),
  padScrews: [at([PRESS_X + 1, -27.5, PAD_H]), at([PRESS_X + 11, -27.5, PAD_H])],
  post: solid(PRESS_POST, PAD_H, ARM_Z - PAD_H, 4, 0.6),
  postSeam: k.sideSeam(PRESS_POST, 10, P, 4),
  lockPlate: solid({ ...LOCK_PLATE }, LOCK_Z - 4, 8, 2, 0.2),
  lockRing: k.sideRing([RAM_X, PLATE_FACE, LOCK_Z], 3, "y", P, 28),
  lockHole: k.sideRing([RAM_X, PLATE_FACE, LOCK_Z], 0.9, "y", P, 12),
  lockMarks: join(
    [0, 90].map((degrees) => {
      const a = (degrees * Math.PI) / 180;
      return seg([RAM_X + Math.cos(a) * 3.3, PLATE_FACE, LOCK_Z + Math.sin(a) * 3.3], [RAM_X + Math.cos(a) * 3.9, PLATE_FACE, LOCK_Z + Math.sin(a) * 3.9]);
    }),
  ),
  idPlate: solid({ ...ID_PLATE }, ID_Z - 2, 4.4, 2, 0.2),
  idDots: [0, 1, 2, 3].map((index) => at([RAM_X - 2.8 + index * 1.87, PLATE_FACE, ID_Z + 0.2])),
  idRule: seg([RAM_X - 3.6, PLATE_FACE, ID_Z - 1.4], [RAM_X + 3.6, PLATE_FACE, ID_Z - 1.4]),
  rod: cyl(RAM_X, RAM_Y, 2, 10.7, 23.3, 16),
  die: cyl(RAM_X, RAM_Y, 4.2, CARD_TOP + 0.1, 3, 28, 0.4),
  dieRing: circ(RAM_X, RAM_Y, 3, CARD_TOP + 3.1, 24),
  housing: cyl(RAM_X, RAM_Y, 5.2, ARM_Z - 8, 8, 28, 0.4),
  housingSeam: k.sideArc(RAM_X, RAM_Y, 5.2, ARM_Z - 4, P, 24),
  arm: solid(PRESS_ARM, ARM_Z, ARM_H, 5, 0.8),
  armLine: outline(k.insetPlan(PRESS_ARM, 2), ARM_Z + ARM_H, 5),
  armScrews: [at([PRESS_X + 6, -22, ARM_Z + ARM_H]), at([PRESS_X + 6, 7, ARM_Z + ARM_H])],
};

// The key, drawn flat on the lock plate and turned about the lock axis.
const KEY_Y = POST_FACE_Y + 0.7 + 0.5;
const KEY_HEAD = 5.4;

function keyPoint(turn: number, a: number, b: number): Flat {
  const theta = (turn * Math.PI) / 2;
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return at([RAM_X + a * c - b * s, KEY_Y, LOCK_Z + a * s + b * c]);
}

export interface KeyPaths {
  neck: string;
  head: string;
  dots: Flat[];
}

export function keyOf(turn: number): KeyPaths {
  const neck: Flat[] = [keyPoint(turn, 1, -0.8), keyPoint(turn, 3.4, -0.8), keyPoint(turn, 3.4, 0.8), keyPoint(turn, 1, 0.8)];
  const head: Flat[] = [];
  for (let step = 0; step < 20; step++) {
    const angle = (step / 20) * Math.PI * 2;
    head.push(keyPoint(turn, KEY_HEAD + 2.6 * Math.cos(angle), 2.6 * Math.sin(angle)));
  }
  const dots = BIT_ANGLES.map((angle) => {
    const around = angle - Math.PI / 4;
    return keyPoint(turn, KEY_HEAD + 1.3 * Math.cos(around), 1.3 * Math.sin(around));
  });
  return { neck: k.pathOf(neck, true), head: k.pathOf(head, true), dots };
}

export const KEY_REST = keyOf(0);

// ─── Recorder ────────────────────────────────────────────────────────────────

const BAR_H = 5;
const RAIL_BAR: Plan = { x: -130, y: 34, w: 260, d: 4, r: 1.2 };
const FRONT_BAR: Plan = { x: -130, y: 60, w: 260, d: 4, r: 1.2 };
const SIDE_LEFT: Plan = { x: -130, y: 38, w: 4, d: 22, r: 0.6 };
const SIDE_RIGHT: Plan = { x: 126, y: 38, w: 4, d: 22, r: 0.6 };
const PEN_RAIL: Plan = { x: -124, y: 34.5, w: 248, d: 3, r: 1 };
const PAPER: Plan = { x: PAPER_X, y: PAPER_Y, w: PAPER_W, d: PAPER_D, r: 0 };
const PEN_ARM_TOP = BAR_H + 2.6;

export const RECORDER_ART = {
  halo: solid({ ...RAIL_BAR, d: 30 }, 0, 0.1).fill,
  back: solid(RAIL_BAR, 0, BAR_H, 4, 0.6),
  backScrews: [-120, 120].map((x) => at([x, 36, BAR_H])),
  left: solid(SIDE_LEFT, 0, BAR_H, 3, 0.6),
  right: solid(SIDE_RIGHT, 0, BAR_H, 3, 0.6),
  front: solid(FRONT_BAR, 0, BAR_H, 4, 0.6),
  frontScrews: [-120, 120].map((x) => at([x, 62, BAR_H])),
  paper: solid(PAPER, 0, PAPER_Z, 2),
  columns: join(PEN_X.map((x) => k.onTop([[x, PAPER_Y], [x, PAPER_Y + PAPER_D]], PAPER_Z, P))),
  penRail: solid(PEN_RAIL, BAR_H, 3, 3, 0.5),
  pens: PEN_X.map((x) => ({
    arm: solid({ x: x - 1.2, y: 37.5, w: 2.4, d: 2.2, r: 0.5 }, 1.4, PEN_ARM_TOP - 1.4, 2, 0.2),
    tip: at([x, PEN_Y, PAPER_Z + 0.2]),
    pivot: at([x, 37.5 + 1.1, PEN_ARM_TOP]),
  })),
  clip: k.onTop(
    [
      [PAPER_X, PAPER_Y],
      [PAPER_X + PAPER_W, PAPER_Y],
      [PAPER_X + PAPER_W, PAPER_Y + PAPER_D],
      [PAPER_X, PAPER_Y + PAPER_D],
    ],
    PAPER_Z,
    P,
    true,
  ),
};

// What the pens have drawn so far: one trace per pen, running off the front of the paper,
// plus the ruling that scrolls with it.
export interface Chart {
  traces: string[];
  ruling: string;
  push: number[];
}

const SAMPLES = 46;

export function chartOf(log: Ev[], now: number): Chart {
  const traces: string[] = [];
  const push: number[] = [];
  PEN_X.forEach((x, pen) => {
    const points: Flat[] = [];
    for (let sample = 0; sample < SAMPLES; sample++) {
      const age = (sample / (SAMPLES - 1)) * (HISTORY + 0.4);
      const dx = deflection(log, pen, now - age);
      points.push(at([x + dx, PEN_Y + age * SPEED, PAPER_Z]));
    }
    traces.push(k.pathOf(points));
    push.push(deflection(log, pen, now));
  });
  const lines: string[] = [];
  const offset = (now * SPEED) % RULING;
  for (let row = 0; PAPER_Y + offset + row * RULING < PAPER_Y + PAPER_D + 0.01; row++) {
    const y = PAPER_Y + offset + row * RULING;
    if (y < PAPER_Y + 0.4) continue;
    lines.push(k.onTop([[PAPER_X, y], [PAPER_X + PAPER_W, y]], PAPER_Z, P));
  }
  return { traces, ruling: join(lines), push };
}

export const CHART_REST = chartOf([], 0);
