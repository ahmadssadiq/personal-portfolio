import { boxCorners, cameraOf, fitProjection, iso, translateAlong, type Flat, type Plane, type Point3 } from "@/components/iso/iso-kit";
import { ARM_X, AZIMUTH, BENCH, BENCH_H, FOOT_H, HEIGHT, SHOULDER_Z, WIDTH } from "./layout";

// Fit the bench, the folded elbow (the highest point) and the stretched gripper (the furthest).
export const P = fitProjection(
  [...boxCorners(BENCH, -BENCH_H - FOOT_H, 0), [ARM_X - 80, 0, SHOULDER_Z + 150], [ARM_X + 372, 0, SHOULDER_Z - 20]],
  WIDTH,
  HEIGHT,
  { pad: 14, azimuth: AZIMUTH },
);

export const at = (point: Point3): Flat => iso(point, P);
export const shift = (x = 0, y = 0, z = 0) => translateAlong(P, [x, y, z]);

const C = cameraOf(P);
// The floor direction toward the viewer, the full direction toward the viewer, and the kit's light.
export const TOWARD: Plane = [C.cosA, C.sinA];
export const VIEW: Point3 = [C.cosA * C.cosE, C.sinA * C.cosE, C.sinE];
export const LIGHT: Plane = [-C.sinA, C.cosA];
export const COS_E = C.cosE;
export const SIN_E = C.sinE;
