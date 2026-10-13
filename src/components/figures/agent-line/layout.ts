// World layout of the agent line. Plain numbers only (x and y on the floor, z up,
// about 1 unit per px of the real thing), so the model and the geometry share them.

export const WIDTH = 600;
export const HEIGHT = 312;
export const AZIMUTH = 50;

export const BASE = { x: -150, y: -48, w: 300, d: 118, r: 9 };
export const BASE_H = 9;
export const FOOT_H = 5;

// The rail and the cart that rides it
export const RAIL_Y = 7;
export const RAIL_W = 3.5;
export const RAIL_X0 = -140;
export const RAIL_X1 = 140;
export const RAIL_H = 3;

export const CART_W = 30;
export const CART_D = 23;
export const CART_Z = 3;
export const CART_H = 3.2;
export const CART_TOP = CART_Z + CART_H;

export const CARD_W = 24;
export const CARD_D = 17;
export const CARD_H = 1.4;
export const CARD_TOP = CART_TOP + CARD_H;

export const TAB_X = [-11, -6, -1, 4, 9];
export const TAB_Y = -8;
export const TAB_W = 2.6;
export const TAB_D = 1.8;
export const TAB_NORMAL = [4, 5, 4, 5, 4];
export const TAB_TALL = 14;
export const BAD_TAB = 2;

// The stamp zone on the card, relative to the cart centre
export const ZONE: [number, number] = [6, 2.2];

// Stations, as cart-centre positions
export const HOME_X = -123;
export const TOOL_X = [-101, -82, -63, -44];
export const GATE_X = -8;
export const JAM_X = -13.6;
export const PRESS_X = 56;
export const OUT_X = 118;
export const RAM_X = PRESS_X + ZONE[0];
export const RAM_Y = ZONE[1];

// Tool rack
export const TRAY_Z = 2.5;
export const TRAY_H = 4;
export const TRAY_TOP = TRAY_Z + TRAY_H;
export const DRAWER_STROKE = 7;

// Gate
export const BRIDGE_Z = 17.5;
export const BRIDGE_H = 5.5;

// Press
export const POST_FACE_Y = -16;
export const LOCK_Z = 17.5;
export const RAM_RISE = 9;

// Recorder
export const PEN_X = [-72, GATE_X, RAM_X, OUT_X];
export const PAPER_X = -126;
export const PAPER_W = 252;
export const PAPER_Y = 38;
export const PAPER_D = 22;
export const PAPER_Z = 0.8;
export const PEN_Y = 38.6;
export const SPEED = 5;
export const HISTORY = PAPER_D / SPEED;
export const RULING = 4;
