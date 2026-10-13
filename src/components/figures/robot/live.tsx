"use client";

import * as React from "react";
import { IsoFigure } from "@/components/iso/react/draw";
import { useInView, useLoop, useReadout } from "@/components/iso/react/live";
import { BENCH, DECKS, LABEL, MOUNT, SHOULDER, WHEEL_BODY, WHEEL_SERVO } from "./art";
import { WHEELS, armOf, rollersOf, type Part } from "./geometry";
import { HEIGHT, WIDTH } from "./layout";
import { baseAt, poseAt, readoutOf, spokenOf, staticsOf, wheelRates, type Angles } from "./model";
import { shift } from "./view";

const TOUR_FIRST = 1200;
const TOUR_BACK = 3600;
const FOLLOW = 0.22;
const PERIOD = 7.5;
const REST_REACH = 0.3;

const clamp = (value: number, low = 0, high = 1) => Math.min(high, Math.max(low, value));
const tenth = (value: number) => Math.round(value * 10) / 10;
const put = (node: Element | null | undefined, name: string, value: string) => {
  if (node && node.getAttribute(name) !== value) node.setAttribute(name, value);
};

// servos and horns are structure; the gripper is the one lit part; the printed links are the subject
const toneOf = (id: string) => (/servo|horn/.test(id) ? "mid" : "hi");
const litOf = (id: string) => id.startsWith("jaw");

function PartView({ part, bind }: { part: Part; bind: (node: SVGGElement | null) => void }) {
  return (
    <g ref={bind} className="iso-solid" data-lit={litOf(part.id) ? "" : undefined}>
      <path className="iso-fill" d={part.paths.fill} />
      {[0, 1, 2, 3].map((index) => (
        <path key={index} className="iso-shade" data-shade={index} d={part.paths.shades[index] ?? ""} />
      ))}
      <path className="iso-top" d={part.paths.top} />
      <path className="iso-line iso-crease" data-tone="faint" d={part.paths.crease} />
      <path className="iso-line iso-edge" data-tone={toneOf(part.id)} d={part.paths.outline} />
      <path className="iso-line" data-tone="lo" data-free="" d={part.line} />
      <g className="iso-dots" data-tone="mid">
        {part.dots.map(([x, y], index) => (
          <circle key={index} cx={tenth(x)} cy={tenth(y)} r={0.5} />
        ))}
      </g>
    </g>
  );
}

function write(node: SVGGElement | null | undefined, part: Part) {
  if (!node) return;
  const c = node.children;
  put(c[0], "d", part.paths.fill);
  for (let index = 0; index < 4; index++) put(c[1 + index], "d", part.paths.shades[index] ?? "");
  put(c[5], "d", part.paths.top);
  put(c[6], "d", part.paths.crease);
  put(c[7], "d", part.paths.outline);
  put(c[8], "d", part.line);
  const dots = c[9]?.children;
  part.dots.forEach(([x, y], index) => {
    put(dots?.[index], "cx", `${tenth(x)}`);
    put(dots?.[index], "cy", `${tenth(y)}`);
  });
}

const REST_POSE = poseAt(REST_REACH);
const REST_ARM = armOf(REST_POSE, 0.25);
const REST_ROLLERS = WHEELS.map((wheel) => rollersOf(wheel, 0));
const REST_TEXT = readoutOf(staticsOf(REST_POSE));
export const RESTING_READOUT = REST_TEXT;

export function RobotLive() {
  const { anchor, say } = useReadout<HTMLDivElement>();
  const root = React.useRef<HTMLDivElement | null>(null);
  const robot = React.useRef<SVGGElement | null>(null);
  const groups = React.useRef<{ back: (SVGGElement | null)[]; main: (SVGGElement | null)[]; front: (SVGGElement | null)[] }>({ back: [], main: [], front: [] });
  const rollers = React.useRef<(SVGPathElement | null)[]>([null, null, null]);
  const state = React.useRef({ t: 0, reach: REST_REACH, pose: { ...REST_POSE } as Angles, spin: [0, 0, 0], text: REST_TEXT });
  const engaged = React.useRef(false);
  const dragging = React.useRef(false);
  const tourFrom = React.useRef(0);
  const visible = useInView(root);

  const draw = React.useCallback(() => {
    const s = state.current;
    const base = baseAt(s.t);
    put(robot.current, "transform", shift(base.x, base.y));
    const arm = armOf(s.pose, 0.24 + 0.17 * Math.sin(s.t * 1.3));
    (["back", "main", "front"] as const).forEach((layer) => arm[layer].forEach((part, index) => write(groups.current[layer][index], part)));
    WHEELS.forEach((wheel, index) => put(rollers.current[index], "d", rollersOf(wheel, s.spin[index] ?? 0)));
    const text = readoutOf(staticsOf(s.pose));
    if (text !== s.text) {
      s.text = text;
      say(text);
    }
  }, [say]);

  const tick = React.useCallback(
    (dt: number, calm: boolean) => {
      const s = state.current;
      const touring = !calm && !engaged.current && performance.now() >= tourFrom.current;
      if (!calm) s.t += dt;
      if (touring) s.reach = 0.5 + 0.47 * Math.sin((s.t * 2 * Math.PI) / PERIOD - 1.2);
      const want = poseAt(s.reach);
      const k = calm ? 1 : 1 - Math.exp(-dt / FOLLOW);
      let moving = false;
      for (const key of ["a1", "a2", "a3"] as const) {
        s.pose[key] += (want[key] - s.pose[key]) * k;
        if (Math.abs(want[key] - s.pose[key]) < 1e-4) s.pose[key] = want[key];
        else moving = true;
      }
      if (!calm) {
        const base = baseAt(s.t);
        wheelRates(base.vx, base.vy).forEach((rate, index) => {
          s.spin[index] = (s.spin[index] ?? 0) + rate * dt;
        });
      }
      draw();
      // under reduced motion the base stands still and the arm only answers the reader
      return calm ? moving : true;
    },
    [draw],
  );

  const kick = useLoop(tick, visible);

  React.useEffect(() => {
    if (visible) tourFrom.current = performance.now() + TOUR_FIRST;
  }, [visible]);

  const steer = (reach: number) => {
    state.current.reach = clamp(reach);
    const node = root.current;
    if (node) {
      const statics = staticsOf(poseAt(state.current.reach));
      node.setAttribute("aria-valuenow", `${Math.round(state.current.reach * 100)}`);
      node.setAttribute("aria-valuetext", spokenOf(statics));
    }
    kick();
  };
  const release = () => {
    tourFrom.current = performance.now() + TOUR_BACK;
    engaged.current = false;
  };
  const reachAt = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    return box.width ? ((event.clientX - box.left) / box.width - 0.18) / 0.64 : state.current.reach;
  };
  const slot = (list: (SVGGElement | null)[], index: number) => (node: SVGGElement | null) => {
    list[index] = node;
  };

  return (
    <div
      ref={(node) => {
        root.current = node;
        anchor.current = node;
      }}
      className="rb"
      role="slider"
      tabIndex={0}
      aria-label="SO-101 arm on a LeKiwi base. Left and right arrows fold and stretch the arm."
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(REST_REACH * 100)}
      aria-valuetext={spokenOf(staticsOf(REST_POSE))}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") engaged.current = true;
      }}
      onPointerMove={(event) => {
        if (event.pointerType === "mouse" || dragging.current) {
          engaged.current = true;
          steer(reachAt(event));
        }
      }}
      onPointerDown={(event) => {
        dragging.current = true;
        engaged.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        steer(reachAt(event));
      }}
      onPointerUp={(event) => {
        dragging.current = false;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        if (event.pointerType !== "mouse") release();
      }}
      onPointerCancel={() => {
        dragging.current = false;
        release();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && !dragging.current) release();
      }}
      onFocus={() => {
        engaged.current = true;
      }}
      onBlur={release}
      onKeyDown={(event) => {
        const step = event.shiftKey ? 0.25 : 0.1;
        let next: number | null = null;
        if (event.key === "ArrowRight" || event.key === "ArrowUp") next = state.current.reach + step;
        else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = state.current.reach - step;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = 1;
        if (next === null) return;
        event.preventDefault();
        engaged.current = true;
        steer(next);
      }}
    >
      <IsoFigure width={WIDTH} height={HEIGHT} label={LABEL}>
        {BENCH}
        <g ref={robot}>
          {WHEELS.map((wheel, index) =>
            wheel.back ? (
              <g key={index}>
                {WHEEL_SERVO[index]}
                {WHEEL_BODY[index]}
                <path
                  ref={(node) => {
                    rollers.current[index] = node;
                  }}
                  className="iso-line"
                  data-tone="lo"
                  d={REST_ROLLERS[index]}
                />
              </g>
            ) : (
              <g key={index}>{WHEEL_SERVO[index]}</g>
            ),
          )}
          {DECKS}
          {WHEELS.map((wheel, index) =>
            wheel.back ? null : (
              <g key={index}>
                {WHEEL_BODY[index]}
                <path
                  ref={(node) => {
                    rollers.current[index] = node;
                  }}
                  className="iso-line"
                  data-tone="lo"
                  d={REST_ROLLERS[index]}
                />
              </g>
            ),
          )}
          {MOUNT}
          {REST_ARM.back.map((part, index) => (
            <PartView key={part.id} part={part} bind={slot(groups.current.back, index)} />
          ))}
          {SHOULDER}
          {REST_ARM.main.map((part, index) => (
            <PartView key={part.id} part={part} bind={slot(groups.current.main, index)} />
          ))}
          {REST_ARM.front.map((part, index) => (
            <PartView key={part.id} part={part} bind={slot(groups.current.front, index)} />
          ))}
        </g>
      </IsoFigure>
    </div>
  );
}
