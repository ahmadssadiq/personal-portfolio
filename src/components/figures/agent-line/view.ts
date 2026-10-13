import { boxCorners, fitProjection, iso, type Flat, type Point3 } from "@/components/iso/iso-kit";
import { AZIMUTH, BASE, BASE_H, FOOT_H, HEIGHT, WIDTH } from "./layout";

// The base sets the extent; the press arm is the tallest thing and sits inside it.
export const P = fitProjection(
  [...boxCorners(BASE, -BASE_H - FOOT_H, 0), [56, -27, 40], [70, 11, 40]],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: AZIMUTH },
);

export const at = (point: Point3): Flat => iso(point, P);

const ORIGIN = at([0, 0, 0]);
const minus = (a: Flat, b: Flat): Flat => [a[0] - b[0], a[1] - b[1]];
export const EX = minus(at([1, 0, 0]), ORIGIN);
export const EY = minus(at([0, 1, 0]), ORIGIN);
export const EZ = minus(at([0, 0, 1]), ORIGIN);

const fine = (value: number) => Math.round(value * 100) / 100;

// A screen translation for a world offset, for moving a group that was built at rest.
export const shift = (x: number, y = 0, z = 0) =>
  `translate(${fine(EX[0] * x + EY[0] * y + EZ[0] * z)} ${fine(EX[1] * x + EY[1] * y + EZ[1] * z)})`;
