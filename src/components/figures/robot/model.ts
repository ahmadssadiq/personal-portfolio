// The model: where the three pitch joints sit for a given reach, what gravity asks of each
// servo there, and how fast each omni wheel has to turn. Pure functions, SI units inside.

import { BASE_R, BEAM_Y, DRIFT, FORK_Y0, FORK_Y1, L1, L2, L3, SERVO, WHEEL_AT, WHEEL_R } from "./layout";

const G = 9.81;
const PLA = 1240; // kg/m3
const INFILL = 0.35; // printed parts are walls and infill, not solid: an assumption
const MM = 1e-3;

export interface Angles {
  a1: number; // upper arm, from straight up, toward the reach
  a2: number; // forearm, the same way
  a3: number; // hand, the same way
}

const clamp = (value: number, low = 0, high = 1) => Math.min(high, Math.max(low, value));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const RAD = Math.PI / 180;

// The reach schedule: the wrist point in the shoulder's frame, from folded (0) to stretched (1),
// then two link inverse kinematics with the elbow up.
export function poseAt(reach: number): Angles {
  const s = clamp(reach);
  const rho = mix(140, 243, s);
  const lift = mix(62, 6, s) * RAD;
  const x = rho * Math.cos(lift);
  const z = rho * Math.sin(lift);
  const d = Math.hypot(x, z);
  const beta = Math.atan2(x, z);
  const gamma = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  const a1 = beta - gamma;
  const a2 = Math.atan2(x - L1 * Math.sin(a1), z - L1 * Math.cos(a1));
  return { a1, a2, a3: mix(118, 95, s) * RAD };
}

// Printed mass of one link, from the same outline the drawing uses (mm3 to kg).
const beamOf = (length: number) => 26.5 * (BEAM_Y * 2) * (length + 14.5 - 36);
const FORK = 2 * (24 * 40 * (FORK_Y1 - FORK_Y0)) + 2 * (Math.PI * 13.5 * 13.5 * (FORK_Y1 - FORK_Y0)) + 26 * 8 * (FORK_Y1 * 2);
const kgOf = (mm3: number) => mm3 * 1e-9 * PLA * INFILL;
const LINK1 = kgOf(beamOf(L1) + FORK);
const LINK2 = kgOf(beamOf(L2) + FORK);
const HAND = kgOf(FORK * 0.8 + 10 * 44 * 30 + 2 * (62 * 7 * 22));

export interface Statics {
  shoulder: number; // N.m
  elbow: number;
  wrist: number;
  reach: number; // mm, shoulder axis to grip point
  tip: [number, number]; // mm, in the shoulder's frame
}

export function staticsOf(a: Angles): Statics {
  const u1 = [Math.sin(a.a1), Math.cos(a.a1)];
  const u2 = [Math.sin(a.a2), Math.cos(a.a2)];
  const u3 = [Math.sin(a.a3), Math.cos(a.a3)];
  const elbowX = L1 * u1[0]!;
  const wristX = elbowX + L2 * u2[0]!;
  // [kg, x in mm, link]: every servo from the datasheet, every printed part from its outline
  const masses: [number, number, number][] = [
    [LINK1, u1[0]! * (L1 * 0.55), 1],
    [SERVO.kg, u1[0]! * (L1 - SERVO.off), 1],
    [LINK2, elbowX + u2[0]! * (L2 * 0.55), 2],
    [SERVO.kg, elbowX + u2[0]! * (L2 - SERVO.off), 2],
    [HAND, wristX + u3[0]! * 60, 3],
    [SERVO.kg, wristX + u3[0]! * 54, 3],
    [SERVO.kg, wristX + u3[0]! * 95, 3],
  ];
  let shoulder = 0;
  let elbow = 0;
  let wrist = 0;
  for (const [kg, x, link] of masses) {
    shoulder += G * kg * x * MM;
    if (link >= 2) elbow += G * kg * (x - elbowX) * MM;
    if (link >= 3) wrist += G * kg * (x - wristX) * MM;
  }
  const tip: [number, number] = [wristX + L3 * u3[0]!, L1 * u1[1]! + L2 * u2[1]! + L3 * u3[1]!];
  return { shoulder, elbow, wrist, reach: Math.hypot(tip[0], tip[1]), tip };
}

// The base: a slow figure on the bench. Position in mm and velocity in mm/s at time t.
export function baseAt(t: number) {
  const w = DRIFT.rate;
  return {
    x: DRIFT.x * Math.sin(w * t),
    y: DRIFT.y * Math.sin(2 * w * t),
    vx: DRIFT.x * w * Math.cos(w * t),
    vy: DRIFT.y * 2 * w * Math.cos(2 * w * t),
  };
}

// Three wheel omni kinematics without turning: each rim moves at the part of the base's
// velocity that lies along its own rolling direction. Returns rad/s for each wheel.
export function wheelRates(vx: number, vy: number) {
  return WHEEL_AT.map((degrees) => {
    const a = degrees * RAD;
    return (-Math.sin(a) * vx + Math.cos(a) * vy) / WHEEL_R;
  });
}

export const rpmOf = (rate: number) => (rate * 60) / (2 * Math.PI);
export const BASE_RADIUS = BASE_R;

const one = (value: number, digits = 0) => value.toFixed(digits);
export function readoutOf(s: Statics) {
  return `reach ${one(s.reach)} mm · ${one(s.shoulder, 2)} N·m · ${one((s.shoulder / SERVO.stall) * 100)} %`;
}
export function spokenOf(s: Statics) {
  return `Reach ${one(s.reach)} millimetres. The shoulder servo holds ${one(s.shoulder, 2)} newton metres, ${one((s.shoulder / SERVO.stall) * 100)} percent of its stall torque.`;
}
