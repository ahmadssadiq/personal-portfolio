import * as k from "@/components/iso/iso-kit";
import type { Flat, Plan, Plane, Point3, SolidPaths } from "@/components/iso/iso-kit";
import {
  ARM_X,
  BASE_R,
  BEAM_Y,
  BENCH,
  BENCH_H,
  DECK,
  FOOT_H,
  FORK_Y0,
  FORK_Y1,
  HORN_Y,
  L1,
  L2,
  PAN_TOP,
  PLATE_HI,
  PLATE_LO,
  PLATE_T,
  SERVO,
  SERVO_Y,
  SHOULDER_Z,
  TOP,
  WHEEL_AT,
  WHEEL_R,
  WHEEL_W,
} from "./layout";
import type { Angles } from "./model";
import { COS_E, LIGHT, P, SIN_E, TOWARD, at } from "./view";

const RAD = Math.PI / 180;
const solid = (plan: Plan, z: number, h: number, steps = 5, bevel = 0) => k.slabOf(plan, z, h, P, steps, bevel);
const cyl = (cx: number, cy: number, r: number, z: number, h: number, steps = 28, bevel = 0) => k.cylinder(cx, cy, r, z, h, P, steps, bevel);
const circ = (cx: number, cy: number, r: number, z: number, steps = 28) => k.ring(cx, cy, r, z, P, steps);
const outline = (plan: Plan, z: number, steps = 6) => k.planOutline(plan, z, P, steps);
const join = (paths: string[]) => paths.join("");
const depth = (x: number, y: number) => x * TOWARD[0] + y * TOWARD[1];

// ─── A prism lying on its side ───────────────────────────────────────────────
// The kit extrudes outlines straight up. Arm links and wheels are outlines in a vertical
// plane, extruded sideways: `u` is the horizontal direction the outline's first coordinate
// runs along, the second coordinate is height, and the solid runs from n0 to n1 along the
// horizontal direction square to `u`. Shaded by the kit's rules: four side tones by facing,
// a lighter tone for faces that look up.

function hull(points: Flat[]): Flat[] {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (sorted.length < 3) return sorted;
  const cross = (o: Flat, a: Flat, b: Flat) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: Flat[] = [];
  for (const point of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2]!, lower[lower.length - 1]!, point) <= 0) lower.pop();
    lower.push(point);
  }
  const upper: Flat[] = [];
  for (let index = sorted.length - 1; index >= 0; index--) {
    const point = sorted[index]!;
    while (upper.length >= 2 && cross(upper[upper.length - 2]!, upper[upper.length - 1]!, point) <= 0) upper.pop();
    upper.push(point);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

export interface Section {
  origin: Point3;
  u: Plane;
}

const across = (u: Plane): Plane => [-u[1], u[0]];
const pointOn = (s: Section, a: number, b: number, t: number): Point3 => {
  const n = across(s.u);
  return [s.origin[0] + s.u[0] * a + n[0] * t, s.origin[1] + s.u[1] * a + n[1] * t, s.origin[2] + b];
};
// Which end of a sideways prism faces the viewer
const nearEnd = (s: Section, n0: number, n1: number) => {
  const n = across(s.u);
  return n[0] * TOWARD[0] + n[1] * TOWARD[1] > 0 ? n1 : n0;
};

export function prism(s: Section, outlinePoints: Plane[], n0: number, n1: number): SolidPaths {
  const n = across(s.u);
  const front = n[0] * TOWARD[0] + n[1] * TOWARD[1] > 0;
  const tNear = front ? n1 : n0;
  const tFar = front ? n0 : n1;
  let area = 0;
  for (let index = 0; index < outlinePoints.length; index++) {
    const [ax, ay] = outlinePoints[index]!;
    const [bx, by] = outlinePoints[(index + 1) % outlinePoints.length]!;
    area += ax * by - bx * ay;
  }
  const ccw = area > 0;
  const near = outlinePoints.map(([a, b]) => at(pointOn(s, a, b, tNear)));
  const far = outlinePoints.map(([a, b]) => at(pointOn(s, a, b, tFar)));
  const shades: string[][] = [[], [], [], []];
  const tops: string[] = [];
  const bucket = (lit: number) => Math.min(3, Math.max(0, Math.floor(lit * 4)));
  const endLit = ((front ? 1 : -1) * (n[0] * LIGHT[0] + n[1] * LIGHT[1]) + 1) / 2;
  shades[bucket(endLit)]!.push(k.pathOf(near, true));
  const uToward = s.u[0] * TOWARD[0] + s.u[1] * TOWARD[1];
  const uLight = s.u[0] * LIGHT[0] + s.u[1] * LIGHT[1];
  for (let index = 0; index < outlinePoints.length; index++) {
    const next = (index + 1) % outlinePoints.length;
    const [ax, ay] = outlinePoints[index]!;
    const [bx, by] = outlinePoints[next]!;
    const length = Math.hypot(bx - ax, by - ay) || 1;
    const m: Plane = ccw ? [(by - ay) / length, -(bx - ax) / length] : [-(by - ay) / length, (bx - ax) / length];
    if (m[0] * uToward * COS_E + m[1] * SIN_E <= 1e-9) continue;
    const quad = k.pathOf([near[index]!, near[next]!, far[next]!, far[index]!], true);
    if (m[1] > 0.55) tops.push(quad);
    else shades[bucket((m[0] * uLight + 1) / 2)]!.push(quad);
  }
  const silhouette = hull([...near, ...far]);
  return {
    fill: k.pathOf(silhouette, true),
    outline: k.pathOf(silhouette, true),
    crease: k.pathOf(near, true),
    top: join(tops),
    shades: shades.map(join),
  };
}

const circle = (ca: number, cb: number, r: number, steps = 24): Plane[] =>
  Array.from({ length: steps }, (_, step) => {
    const angle = (step / steps) * Math.PI * 2;
    return [ca + r * Math.cos(angle), cb + r * Math.sin(angle)] as Plane;
  });
const rect = (a0: number, a1: number, b0: number, b1: number): Plane[] => [
  [a0, b0],
  [a1, b0],
  [a1, b1],
  [a0, b1],
];

// ─── Bench ───────────────────────────────────────────────────────────────────

const FEET = k.corners(BENCH, 22);
const SCREWS = k.corners(BENCH, 10);
const LABEL: Plan = { x: BENCH.x + 16, y: BENCH.y + BENCH.d - 26, w: 64, d: 13, r: 2 };
const STRIP: Plan = { x: -110, y: BENCH.y + BENCH.d - 18, w: 300, d: 8, r: 1 };
const STRIP_TICKS = k.topTicks(STRIP.x + 5, STRIP.x + STRIP.w - 5, 5, 5, STRIP.y, 0.7, [2.2, 4.2], P);

export const BENCH_ART = {
  halo: solid(BENCH, -BENCH_H - FOOT_H, BENCH_H).fill,
  feet: FEET.map(([x, y]) => [cyl(x, y, 9, -BENCH_H - FOOT_H, 2), cyl(x, y, 7, -BENCH_H - FOOT_H + 2, FOOT_H - 2)]),
  slab: solid(BENCH, -BENCH_H, BENCH_H, 8, 1.8),
  groove: outline(k.insetPlan(BENCH, 6), 0, 8),
  screws: SCREWS.map(([x, y]) => at([x, y, 0])),
  screwRings: join(SCREWS.map(([x, y]) => circ(x, y, 2.8, 0, 14))),
  label: solid(LABEL, 0, 0.9, 4),
  labelLine: outline(k.insetPlan(LABEL, 1.8), 0.9, 4),
  labelRule: join([0, 1, 2].map((row) => k.onTop([[LABEL.x + 9, LABEL.y + 3.6 + row * 2.6], [LABEL.x + (row === 1 ? 38 : 50), LABEL.y + 3.6 + row * 2.6]], 0.9, P))),
  labelScrews: [at([LABEL.x + 4, LABEL.y + LABEL.d / 2, 0.9]), at([LABEL.x + LABEL.w - 4, LABEL.y + LABEL.d / 2, 0.9])],
  strip: solid(STRIP, 0, 0.7, 3),
  ticksMinor: STRIP_TICKS.minor,
  ticksMajor: STRIP_TICKS.major,
};

// ─── LeKiwi base ─────────────────────────────────────────────────────────────

// Plate outline: flats facing the three wheels sit inside them, the corners between reach further out.
function plateRing(inner: number, outer: number): Plane[] {
  const planes: [number, number][] = [...WHEEL_AT.map((d) => [d * RAD, inner] as [number, number]), ...WHEEL_AT.map((d) => [d * RAD + Math.PI, outer] as [number, number])];
  const steps = 96;
  const ring: Plane[] = [];
  for (let step = 0; step < steps; step++) {
    const angle = (step / steps) * Math.PI * 2;
    let r = outer * 1.06;
    for (const [facing, distance] of planes) {
      const c = Math.cos(angle - facing);
      if (c > 1e-3) r = Math.min(r, distance / c);
    }
    ring.push([r * Math.cos(angle), r * Math.sin(angle)]);
  }
  return ring;
}
const PLATE = plateRing(104, 142);
const INSET = plateRing(98, 136);

interface Item {
  depth: number;
  paths: SolidPaths;
  tone: "mid" | "lo" | "hi";
  line?: string;
  dots?: Flat[];
}

// Everything that stands on the lower plate, sorted far to near
const between: Item[] = [];
const stand = (plan: Plan, z: number, h: number, tone: Item["tone"], extra: Partial<Item> = {}) =>
  between.push({ depth: depth(plan.x + plan.w / 2, plan.y + plan.d / 2), paths: solid(plan, z, h, 3, 0.4), tone, ...extra });

const BATTERY: Plan = { x: -90, y: -31, w: 105, d: 62, r: 4 };
stand(BATTERY, DECK, 36, "mid", {
  line: outline(k.insetPlan(BATTERY, 5), DECK + 36, 4) + join([0, 1].map((row) => k.onTop([[BATTERY.x + 14, -6 + row * 6], [BATTERY.x + (row ? 52 : 70), -6 + row * 6]], DECK + 36, P))),
});
const BOARD: Plan = { x: -60, y: -15, w: 40, d: 30, r: 1 };
stand(BOARD, DECK + 36, 1.6, "mid", { dots: [at([BOARD.x + 4, BOARD.y + 4, DECK + 37.6]), at([BOARD.x + BOARD.w - 4, BOARD.y + BOARD.d - 4, DECK + 37.6])] });
const PI: Plan = { x: 20, y: -28, w: 85, d: 56, r: 2 };
const PI_Z = DECK + 10;
for (const [x, y] of k.corners(PI, 4)) between.push({ depth: depth(x, y) - 2, paths: cyl(x, y, 2.4, DECK, 10, 8), tone: "lo" });
stand(PI, PI_Z, 1.6, "mid", {
  line: join([0, 1, 2, 3].map((i) => k.onTop([[PI.x + 8 + i * 4, PI.y + 6], [PI.x + 8 + i * 4, PI.y + 18]], PI_Z + 1.6, P))),
  dots: k.corners(PI, 4).map(([x, y]) => at([x, y, PI_Z + 1.6])),
});
stand({ x: 46, y: -5, w: 17, d: 17, r: 1 }, PI_Z + 1.6, 2.2, "lo");
stand({ x: 88, y: -26, w: 17, d: 13.5, r: 1 }, PI_Z + 1.6, 15, "mid");
stand({ x: 88, y: -8.5, w: 17, d: 13.5, r: 1 }, PI_Z + 1.6, 15, "mid");
stand({ x: 84, y: 10, w: 21, d: 16, r: 1 }, PI_Z + 1.6, 13.5, "mid");
stand({ x: 26, y: 22, w: 51, d: 5, r: 0.6 }, PI_Z + 1.6, 2.6, "lo");
const STANDOFFS: Plane[] = WHEEL_AT.flatMap((d) => [-24, 24].map((offset) => [128 * Math.cos((d + 180 + offset) * RAD), 128 * Math.sin((d + 180 + offset) * RAD)] as Plane));
for (const [x, y] of STANDOFFS) between.push({ depth: depth(x, y), paths: cyl(x, y, 3.5, DECK, PLATE_HI - DECK, 6), tone: "hi" });
between.sort((a, b) => a.depth - b.depth);

// One omni wheel: a disc on its side, axle along the radius it sits on
export interface Wheel {
  section: Section;
  n0: number;
  n1: number;
  near: number;
  back: boolean;
  body: SolidPaths;
  hub: string;
  axle: string;
  servo: SolidPaths;
  depth: number;
}

export const WHEELS: Wheel[] = WHEEL_AT.map((degrees) => {
  const a = degrees * RAD;
  const section: Section = { origin: [0, 0, 0], u: [Math.sin(a), -Math.cos(a)] };
  const n0 = BASE_R - WHEEL_W / 2;
  const n1 = BASE_R + WHEEL_W / 2;
  const near = nearEnd(section, n0, n1);
  const face = (points: Plane[]) => k.pathOf(points.map(([p, q]) => at(pointOn(section, p, q, near))), true);
  // its drive servo lies under the lower plate, shaft on the wheel axis
  const reach = BASE_R - WHEEL_W / 2 - 1 - SERVO.H / 2;
  const [rx, ry] = [Math.cos(a), Math.sin(a)];
  const [tx, ty] = [-Math.sin(a), Math.cos(a)];
  const corner = (along: number, side: number): Plane => [reach * rx + along * rx + side * tx, reach * ry + along * ry + side * ty];
  const servoRing: Plane[] = [corner(-SERVO.H / 2, -SERVO.L + 12.4), corner(SERVO.H / 2, -SERVO.L + 12.4), corner(SERVO.H / 2, 12.4), corner(-SERVO.H / 2, 12.4)];
  return {
    section,
    n0,
    n1,
    near,
    back: depth(BASE_R * rx, BASE_R * ry) < 0,
    body: prism(section, circle(0, WHEEL_R, WHEEL_R, 30), n0, n1),
    hub: face(circle(0, WHEEL_R, 33, 24)),
    axle: face(circle(0, WHEEL_R, 8, 14)),
    servo: k.extrude(servoRing, WHEEL_R - SERVO.W / 2, PLATE_LO - (WHEEL_R - SERVO.W / 2), P, { convex: true }),
    depth: depth(BASE_R * rx, BASE_R * ry),
  };
});

// The roller marks on a wheel at its current angle: short arcs on the face it shows, and the
// gaps between rollers across the part of the tread that faces the viewer.
const ROLLERS = 9;
export function rollersOf(wheel: Wheel, spin: number): string {
  const lines: string[] = [];
  const uToward = wheel.section.u[0] * TOWARD[0] + wheel.section.u[1] * TOWARD[1];
  for (let index = 0; index < ROLLERS; index++) {
    const angle = spin + (index / ROLLERS) * Math.PI * 2;
    const arc: Flat[] = [];
    for (let step = 0; step <= 4; step++) {
      const t = angle - 0.2 + (step / 4) * 0.4;
      arc.push(at(pointOn(wheel.section, 42 * Math.cos(t), WHEEL_R + 42 * Math.sin(t), wheel.near)));
    }
    lines.push(k.pathOf(arc));
    const gap = angle + Math.PI / ROLLERS;
    if (Math.cos(gap) * uToward * COS_E + Math.sin(gap) * SIN_E > 0.06) {
      const [p, q] = [WHEEL_R * Math.cos(gap), WHEEL_R + WHEEL_R * Math.sin(gap)];
      lines.push(k.pathOf([at(pointOn(wheel.section, p, q, wheel.n0)), at(pointOn(wheel.section, p, q, wheel.n1))]));
    }
  }
  return join(lines);
}

export const BASE_ART = {
  halo: k.extrude(PLATE, 0.5, 0.1, P, { convex: true }).fill,
  lower: k.extrude(PLATE, PLATE_LO, PLATE_T, P, { convex: true, bevel: 1 }),
  lowerLine: k.onTop(INSET, DECK, P, true),
  between,
  upper: k.extrude(PLATE, PLATE_HI, PLATE_T, P, { convex: true, bevel: 1 }),
  upperLine: k.onTop(INSET, TOP, P, true),
  upperScrews: STANDOFFS.map(([x, y]) => at([x, y, TOP])),
};

// ─── SO-101: the parts that never move ───────────────────────────────────────

const FLANGE: Plan = { x: ARM_X - 47, y: -32, w: 78, d: 64, r: 3 };
const HOUSING: Plan = { x: ARM_X - SERVO.off - 31, y: -22, w: 62, d: 44, r: 4 };
const BLOCK: Plan = { x: ARM_X - SERVO.off - 25, y: -18, w: 50, d: 36, r: 2 };
const HOUSING_TOP = PAN_TOP - 7;
// the arm's own section: outlines in the plane it bends in, extruded across it
export const ARM: Section = { origin: [ARM_X, 0, 0], u: [1, 0] };

export const MOUNT_ART = {
  flange: solid(FLANGE, TOP, 5, 4, 0.6),
  flangeScrews: k.corners(FLANGE, 6).map(([x, y]) => at([x, y, TOP + 5])),
  housing: solid(HOUSING, TOP + 5, HOUSING_TOP - TOP - 5, 5, 0.8),
  housingSeam: k.sideSeam(HOUSING, TOP + 22, P, 5),
  housingLine: outline(k.insetPlan(HOUSING, 4), HOUSING_TOP, 4),
  horn: cyl(ARM_X, 0, 10.5, HOUSING_TOP, 3, 20),
  turret: cyl(ARM_X, 0, 21, HOUSING_TOP + 3, 4, 32, 0.5),
  block: solid(BLOCK, PAN_TOP, SHOULDER_Z - SERVO.W / 2 - PAN_TOP, 4, 0.5),
  shoulderServo: prism(ARM, rect(-SERVO.L + 12.4, 12.4, SHOULDER_Z - SERVO.W / 2, SHOULDER_Z + SERVO.W / 2), -SERVO_Y, SERVO_Y),
  shoulderHorn: prism(ARM, circle(0, SHOULDER_Z, 10.5, 20), SERVO_Y, HORN_Y),
};

// ─── SO-101: the parts that move, rebuilt at each pose ───────────────────────

export interface Part {
  id: string;
  paths: SolidPaths;
  line: string;
  dots: Flat[];
}

// A frame riding on a link: `a` runs along it from its joint, `b` across it
function frame(pivot: Plane, angle: number) {
  const ea: Plane = [Math.sin(angle), Math.cos(angle)];
  const eb: Plane = [Math.cos(angle), -Math.sin(angle)];
  const to = (a: number, b: number): Plane => [pivot[0] + a * ea[0] + b * eb[0], pivot[1] + a * ea[1] + b * eb[1]];
  return { to, shape: (points: Plane[]) => points.map(([a, b]) => to(a, b)), end: (length: number) => to(length, 0) };
}

const HALF = 13.25;
// a fork cheek: round about the joint, square where it meets the bridge
const cheek = (length: number): Plane[] => {
  const points: Plane[] = [];
  for (let step = 0; step <= 12; step++) {
    const angle = Math.PI / 2 + (step / 12) * Math.PI;
    points.push([13.5 * Math.cos(angle), 13.5 * Math.sin(angle)] as Plane);
  }
  points.push([length, -12], [length, 12]);
  return points.map(([a, b]) => [a, -b] as Plane);
};
const beam = (length: number): Plane[] => [
  [36, -HALF],
  [length + 10, -HALF],
  [length + 14.5, -HALF + 4.5],
  [length + 14.5, HALF - 4.5],
  [length + 10, HALF],
  [36, HALF],
];

export function armOf(pose: Angles, grip: number) {
  const shoulder: Plane = [0, SHOULDER_Z];
  const f1 = frame(shoulder, pose.a1);
  const elbow = f1.end(L1);
  const f2 = frame(elbow, pose.a2);
  const wrist = f2.end(L2);
  const f3 = frame(wrist, pose.a3);
  const piece = (id: string, points: Plane[], y0: number, y1: number, line = "", dots: Flat[] = []): Part => ({ id, paths: prism(ARM, points, y0, y1), line, dots });
  const face = (points: Plane[], y: number, closed = true) => k.pathOf(points.map(([a, b]) => at(pointOn(ARM, a, b, y))), closed);
  const bolts = (f: ReturnType<typeof frame>, y: number): Flat[] => [45, 135, 225, 315].map((d) => at(pointOn(ARM, ...f.to(6.5 * Math.cos(d * RAD), 6.5 * Math.sin(d * RAD)), y)));

  const back: Part[] = [];
  const main: Part[] = [];
  const front: Part[] = [];
  const links: [string, ReturnType<typeof frame>, number, number][] = [
    ["upper", f1, L1, 40],
    ["fore", f2, L2, 40],
    ["hand", f3, 0, 34],
  ];
  for (const [name, f, length, fork] of links) {
    back.push(piece(`${name}-back`, f.shape(cheek(fork)), -FORK_Y1, -FORK_Y0));
    front.push(piece(`${name}-fork`, f.shape(cheek(fork)), FORK_Y0, FORK_Y1, face(f.shape(circle(0, 0, 9, 18)), FORK_Y1), bolts(f, FORK_Y1)));
    if (!length) continue;
    main.push(piece(`${name}-beam`, f.shape(beam(length)), -BEAM_Y, BEAM_Y, face([f.to(46, -HALF + 3.5), f.to(length - 38, -HALF + 3.5)], BEAM_Y, false)));
    main.push(piece(`${name}-bridge`, f.shape(rect(34, 42, -13, 13)), -FORK_Y1, FORK_Y1));
    main.push(
      piece(
        `${name}-servo`,
        f.shape(rect(length - SERVO.L + 12.4, length + 12.4, -SERVO.W / 2, SERVO.W / 2)),
        -SERVO_Y,
        SERVO_Y,
        face([f.to(length - 28, -6), f.to(length - 14, -6)], SERVO_Y, false) + face([f.to(length - 28, -2.5), f.to(length - 19, -2.5)], SERVO_Y, false),
      ),
    );
    main.push(piece(`${name}-horn`, f.shape(circle(length, 0, 10.5, 20)), SERVO_Y, HORN_Y));
  }
  // the hand: a bridge, the wrist roll servo with its shaft along the hand, then the gripper
  main.push(piece("hand-bridge", f3.shape(rect(30, 36, -13, 13)), -FORK_Y1, FORK_Y1));
  main.push(piece("roll-servo", f3.shape(rect(36, 71, -20, 20)), -SERVO.W / 2, SERVO.W / 2, face([f3.to(44, -13), f3.to(62, -13)], SERVO.W / 2, false)));
  main.push(piece("roll-horn", f3.shape(rect(71, 74, -10.5, 10.5)), -10.5, 10.5));
  main.push(piece("grip-base", f3.shape(rect(74, 84, -22, 22)), -15, 15));
  main.push(piece("grip-servo", f3.shape(rect(84, 108, -6, 18)), -SERVO_Y, SERVO_Y));
  main.push(piece("jaw-fixed", f3.shape([[84, -22], [140, -21], [146, -18], [146, -15], [84, -15]]), -11, 11, face([f3.to(104, -15), f3.to(142, -15)], 11, false)));
  const pivot = f3.to(96, 8);
  const fj = frame(pivot, pose.a3 + grip);
  main.push(piece("jaw-moving", fj.shape([[-8, -4], [44, -3.5], [50, -1], [50, 2], [44, 4], [-8, 4]]), SERVO_Y, HORN_Y, face(fj.shape(circle(0, 0, 3.2, 12)), HORN_Y)));
  return { back, main, front };
}
