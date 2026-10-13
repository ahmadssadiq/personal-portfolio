// World layout of the SO-101 on its LeKiwi base, in millimetres: x forward (the way the arm
// reaches), y across, z up. Plain numbers only, shared by the model and the geometry.

export const WIDTH = 400;
export const HEIGHT = 396;
export const AZIMUTH = 58;

// The bench the robot drives on
export const BENCH = { x: -190, y: -175, w: 400, d: 350, r: 14 };
export const BENCH_H = 10;
export const FOOT_H = 6;

// LeKiwi base: three omni wheels at 120 degrees. Radii are the constants LeRobot's kinematics uses.
export const WHEEL_R = 50;
export const BASE_R = 125;
export const WHEEL_W = 28;
export const WHEEL_AT = [60, 180, 300];
export const PLATE_LO = 66;
export const PLATE_T = 4;
export const PLATE_HI = 142;
export const DECK = PLATE_LO + PLATE_T;
export const TOP = PLATE_HI + PLATE_T;

// Feetech STS3215 servo, from its datasheet
export const SERVO = { L: 45.2, W: 24.7, H: 35, off: 10.2, kg: 0.055, stall: 2.94 };

// SO-101 arm. L1 and L2 are the joint-to-joint lengths LeRobot's kinematics uses; L3 (wrist
// axis to grip point) and every outline are approximate.
export const ARM_X = 45;
export const PAN_TOP = 194;
export const SHOULDER_Z = 228;
export const L1 = 115.9;
export const L2 = 135;
export const L3 = 110;

// Layers across the arm (y), from its middle outward
export const BEAM_Y = 15;
export const SERVO_Y = SERVO.H / 2;
export const HORN_Y = SERVO_Y + 2.8;
export const FORK_Y0 = 20.5;
export const FORK_Y1 = 24.5;

// How far the base wanders on the bench, and how fast
export const DRIFT = { x: 15, y: 11, rate: 0.75 };
