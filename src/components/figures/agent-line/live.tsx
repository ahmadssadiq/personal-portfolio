"use client";

import * as React from "react";
import { IsoFigure } from "@/components/iso/react/draw";
import { asksForStillness, follow, useInView, useLoop, useReadout } from "@/components/iso/react/live";
import { CHART_REST, KEY_REST, PRESS_ART, RECORDER_ART, STAMP_ART, TAB_REST, chartOf, keyOf, tabOf } from "./geometry";
import { DRAWER_STROKE, HEIGHT, HISTORY, RAM_RISE, WIDTH } from "./layout";
import { AGENTS, REST, TOOLS, readoutOf, scriptOf, spokenOf, type Ev, type Job, type Phase, type Script } from "./model";
import { shift } from "./view";

const TOUR_FIRST = 1400;
const TOUR_BACK = 3600;
const TOUR_GAP = 0.9;
const LOG_KEEP = HISTORY + 1.5;
const NUDGE = 1.6;
const QUEUE_MOST = 3;

// A fixed tour: a clean run, one card that fails the gate, then two more.
const TOUR_TOOLS = [1, 3, 0, 2];

interface Sim {
  now: number;
  running: boolean;
  job: Job | null;
  script: Script | null;
  start: number;
  rest: number;
  queue: Job[];
  log: Ev[];
  made: number;
  tool: number;
  bad: boolean;
  nudge: number[];
}

const newSim = (): Sim => ({
  now: 0,
  running: false,
  job: null,
  script: null,
  start: 0,
  rest: -10,
  queue: [],
  log: [],
  made: 0,
  tool: 1,
  bad: false,
  nudge: [0, 0, 0, 0],
});

const nextAgent = (sim: Sim) => AGENTS[(sim.made + 1) % AGENTS.length]!;

function makeJob(sim: Sim, tool: number, bad: boolean): Job {
  sim.made += 1;
  return { id: sim.made, agent: AGENTS[sim.made % AGENTS.length]!, tool, bad };
}

function begin(sim: Sim, calm: boolean) {
  const job = sim.queue.shift();
  if (!job) return;
  const script = scriptOf(job);
  sim.job = job;
  sim.script = script;
  sim.start = sim.now;
  sim.running = true;
  for (const event of script.events) sim.log.push({ ...event, at: sim.start + event.at });
  if (calm) {
    sim.now = sim.start + script.duration;
    sim.running = false;
    sim.rest = sim.now;
  }
}

const bitOf = (agent: number, index: number) => (agent >> (3 - index)) & 1;
const tenth = (value: number) => Math.round(value * 10) / 10;

function put(node: Element | null, name: string, value: string) {
  if (node && node.getAttribute(name) !== value) node.setAttribute(name, value);
}

interface TabNodes {
  fill: SVGPathElement | null;
  shades: (SVGPathElement | null)[];
  top: SVGPathElement | null;
  crease: SVGPathElement | null;
  bevel: SVGPathElement | null;
  edge: SVGPathElement | null;
}

interface Nodes {
  cart: SVGGElement | null;
  card: SVGGElement | null;
  bridge: SVGGElement | null;
  ram: SVGGElement | null;
  stamp: SVGGElement | null;
  trays: (SVGGElement | null)[];
  pens: (SVGGElement | null)[];
  traces: (SVGPathElement | null)[];
  ruling: SVGPathElement | null;
  tab: TabNodes;
  neck: SVGPathElement | null;
  head: SVGPathElement | null;
  keyDots: (SVGCircleElement | null)[];
  stampDots: (SVGCircleElement | null)[];
  plateDots: (SVGCircleElement | null)[];
  live: HTMLSpanElement | null;
}

interface Props {
  label: string;
  base: React.ReactNode;
  rack: React.ReactNode;
  trays: React.ReactNode[];
  gateBack: React.ReactNode;
  pressPost: React.ReactNode;
  rails: React.ReactNode;
  cartBack: React.ReactNode;
  card: React.ReactNode;
  tabsLeft: React.ReactNode;
  tabsRight: React.ReactNode;
  cartFront: React.ReactNode;
  gateFront: React.ReactNode;
  bridge: React.ReactNode;
  ram: React.ReactNode;
  housing: React.ReactNode;
  arm: React.ReactNode;
  recorder: React.ReactNode;
  recorderFront: React.ReactNode;
  penRail: React.ReactNode;
  pens: React.ReactNode[];
}


export function AgentLineLive(props: Props) {
  const { anchor, say } = useReadout<HTMLDivElement>();
  const root = React.useRef<HTMLDivElement | null>(null);
  const clip = React.useId().replace(/:/g, "");
  const sim = React.useRef<Sim>(newSim());
  const nodes = React.useRef<Nodes>({
    cart: null,
    card: null,
    bridge: null,
    ram: null,
    stamp: null,
    trays: [null, null, null, null],
    pens: [null, null, null, null],
    traces: [null, null, null, null],
    ruling: null,
    tab: { fill: null, shades: [null, null, null, null], top: null, crease: null, bevel: null, edge: null },
    neck: null,
    head: null,
    keyDots: [null, null, null, null],
    stampDots: [null, null, null, null],
    plateDots: [null, null, null, null],
    live: null,
  });
  const shown = React.useRef({ tall: -1, key: -1, agent: -1, phase: "" as string, lit: null as boolean | null, text: "" });
  const engaged = React.useRef(false);
  const tourFrom = React.useRef(0);
  const visible = useInView(root);

  const draw = React.useCallback(
    (dt: number) => {
      const s = sim.current;
      const n = nodes.current;
      const job = s.job;
      const pose = s.script ? (s.running ? s.script.at(s.now - s.start) : s.script.at(s.script.duration)) : REST;
      const agent = job ? job.agent : nextAgent(s);

      // The cart and the card it carries
      put(n.cart, "transform", shift(pose.x));
      put(n.stamp, "opacity", `${Math.round(pose.stamp * 100) / 100}`);
      if (shown.current.lit !== pose.lamp) {
        shown.current.lit = pose.lamp;
        n.card?.querySelector(".iso-solid")?.toggleAttribute("data-lit", !pose.lamp);
        n.bridge?.querySelector(".iso-solid")?.toggleAttribute("data-lit", pose.lamp);
      }

      // The one field that can come out malformed
      const tall = Math.round(pose.tall * 200) / 200;
      if (shown.current.tall !== tall) {
        shown.current.tall = tall;
        const paths = tall ? tabOf(tall) : TAB_REST;
        const t = n.tab;
        put(t.fill, "d", paths.fill);
        paths.shades.forEach((d, index) => put(t.shades[index] ?? null, "d", d));
        put(t.top, "d", paths.top);
        put(t.crease, "d", paths.crease);
        put(t.bevel, "d", paths.bevel ?? "");
        put(t.edge, "d", paths.outline);
      }

      // The drawer that is open, and the one that is selected
      s.nudge = s.nudge.map((value, index) => follow(value, !s.running && index === s.tool ? NUDGE : 0, dt, 0.15, dt === 0));
      for (let index = 0; index < TOOLS; index++) {
        const out = job && index === job.tool && s.running ? pose.drawer * DRAWER_STROKE : 0;
        put(n.trays[index] ?? null, "transform", shift(0, out + (s.nudge[index] ?? 0)));
      }

      // The press: the key turns, then the ram comes down
      put(n.ram, "transform", shift(0, 0, pose.ram * RAM_RISE));
      const turn = Math.round(pose.key * 200) / 200;
      if (shown.current.key !== turn || shown.current.agent !== agent) {
        shown.current.key = turn;
        const key = turn ? keyOf(turn) : KEY_REST;
        put(n.neck, "d", key.neck);
        put(n.head, "d", key.head);
        key.dots.forEach(([x, y], index) => {
          const dot = n.keyDots[index];
          put(dot ?? null, "cx", `${tenth(x)}`);
          put(dot ?? null, "cy", `${tenth(y)}`);
        });
      }
      if (shown.current.agent !== agent) {
        shown.current.agent = agent;
        for (let index = 0; index < 4; index++) {
          const level = bitOf(agent, index) ? "" : "0.1";
          for (const dots of [n.keyDots, n.stampDots, n.plateDots]) {
            const dot = dots[index];
            if (dot) dot.style.opacity = level;
          }
        }
      }

      // The recorder: the paper scrolls, and each pen draws its station's events
      const chart = s.log.length || s.now ? chartOf(s.log, s.now) : CHART_REST;
      chart.traces.forEach((d, index) => put(n.traces[index] ?? null, "d", d));
      put(n.ruling, "d", chart.ruling);
      chart.push.forEach((value, index) => put(n.pens[index] ?? null, "transform", shift(value)));

      // Words: the readout always, the screen reader only when the phase changes
      const next = { tool: s.tool, bad: s.bad };
      const phase: Phase = pose.phase;
      const text = readoutOf(job, phase, s.script, next, s.running);
      if (shown.current.text !== text) {
        shown.current.text = text;
        say(text);
      }
      const key = `${job?.id ?? 0}:${phase}:${s.running}`;
      if (shown.current.phase !== key) {
        shown.current.phase = key;
        if (n.live) n.live.textContent = spokenOf(job, phase, s.script, next);
      }
    },
    [say],
  );

  const tick = React.useCallback(
    (dt: number, calm: boolean) => {
      const s = sim.current;
      const tourOn = !calm && !engaged.current;
      if (tourOn && performance.now() >= tourFrom.current && !s.running && s.queue.length === 0 && s.now - s.rest > TOUR_GAP) {
        const index = s.made;
        s.queue.push(makeJob(s, TOUR_TOOLS[index % TOUR_TOOLS.length]!, index % 3 === 1));
      }
      if (!s.running && s.queue.length) begin(s, calm);
      if (!calm) s.now += dt;
      if (s.running && s.script && s.now - s.start >= s.script.duration) {
        s.running = false;
        s.rest = s.now;
      }
      s.log = s.log.filter((event) => s.now - event.at < LOG_KEEP);
      draw(calm ? 0 : dt);
      const recent = s.log.some((event) => s.now - event.at < HISTORY + 0.5);
      return s.running || s.queue.length > 0 || recent || tourOn || s.nudge.some((value, index) => value !== (!s.running && index === s.tool ? NUDGE : 0));
    },
    [draw],
  );

  const kick = useLoop(tick, visible);

  React.useEffect(() => {
    if (!visible) return;
    tourFrom.current = performance.now() + TOUR_FIRST;
    const timer = window.setTimeout(kick, TOUR_FIRST + 40);
    return () => window.clearTimeout(timer);
  }, [visible, kick]);

  // Paint the resting pose once, in case the loop never starts (reduced motion, off screen).
  React.useEffect(() => {
    draw(0);
  }, [draw]);

  const wake = React.useCallback(() => {
    tourFrom.current = performance.now() + TOUR_BACK;
    window.setTimeout(kick, TOUR_BACK + 40);
    kick();
  }, [kick]);

  const run = React.useCallback(
    (tool: number) => {
      const s = sim.current;
      s.tool = tool;
      if (s.queue.length < QUEUE_MOST) {
        s.queue.push(makeJob(s, tool, s.bad));
        s.bad = false;
      }
      wake();
    },
    [wake],
  );

  const choose = React.useCallback(
    (tool: number) => {
      const s = sim.current;
      s.tool = (tool + TOOLS) % TOOLS;
      wake();
      draw(0);
    },
    [draw, wake],
  );

  const bind = <K extends keyof Nodes>(key: K) => (node: Nodes[K]) => {
    nodes.current[key] = node;
  };
  const slot = <T extends Element>(list: (T | null)[], index: number) => (node: T | null) => {
    list[index] = node;
  };
  const shade = (index: number) => (node: SVGPathElement | null) => {
    nodes.current.tab.shades[index] = node;
  };
  const part = (key: keyof Omit<TabNodes, "shades">) => (node: SVGPathElement | null) => {
    nodes.current.tab[key] = node;
  };

  return (
    <div
      ref={(node) => {
        root.current = node;
        anchor.current = node;
      }}
      className="al"
      role="group"
      tabIndex={0}
      aria-label="Agent line. Press Space or click a drawer to send a card through. Left and right arrows choose a drawer. B makes the next card malformed."
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") engaged.current = true;
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        engaged.current = false;
        tourFrom.current = performance.now() + TOUR_BACK;
        window.setTimeout(kick, TOUR_BACK + 40);
      }}
      onPointerDown={(event) => {
        const target = (event.target as Element).closest?.("[data-tool]");
        run(target ? Number(target.getAttribute("data-tool")) : sim.current.tool);
      }}
      onFocus={() => {
        engaged.current = true;
      }}
      onBlur={() => {
        engaged.current = false;
        tourFrom.current = performance.now() + TOUR_BACK;
        window.setTimeout(kick, TOUR_BACK + 40);
      }}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          if (!event.repeat) run(sim.current.tool);
        } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          choose(sim.current.tool + 1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          choose(sim.current.tool - 1);
        } else if (event.key === "b" || event.key === "B") {
          event.preventDefault();
          sim.current.bad = !sim.current.bad;
          wake();
          draw(0);
        } else if (/^[1-4]$/.test(event.key)) {
          event.preventDefault();
          choose(Number(event.key) - 1);
        }
      }}
    >
      <span className="al-live" aria-live="polite" ref={bind("live")} />
      <IsoFigure width={WIDTH} height={HEIGHT} label={props.label}>
        {props.base}
        {props.rack}
        {props.trays.map((tray, index) => (
          <g key={index} ref={slot(nodes.current.trays, index)} data-tool={index} className="al-tray">
            {tray}
          </g>
        ))}
        {props.gateBack}
        {props.pressPost}
        <g>
          <g className="al-bit" data-tone="hi">
            {PRESS_ART.idDots.map(([x, y], index) => (
              <circle key={index} ref={slot(nodes.current.plateDots, index)} className="al-bit-dot" cx={tenth(x)} cy={tenth(y)} r={0.6} />
            ))}
          </g>
          <path className="al-key" ref={bind("neck")} d={KEY_REST.neck} />
          <path className="al-key" ref={bind("head")} d={KEY_REST.head} />
          <g className="al-bit" data-tone="hi">
            {KEY_REST.dots.map(([x, y], index) => (
              <circle key={index} ref={slot(nodes.current.keyDots, index)} className="al-bit-dot" cx={tenth(x)} cy={tenth(y)} r={0.55} />
            ))}
          </g>
        </g>
        {props.rails}
        <g ref={bind("cart")} transform={shift(REST.x)}>
          {props.cartBack}
          <g ref={bind("card")}>{props.card}</g>
          {props.tabsLeft}
          <g className="iso-solid">
            <path ref={part("fill")} className="iso-fill" d={TAB_REST.fill} />
            {[0, 1, 2, 3].map((index) => (
              <path key={index} ref={shade(index)} className="iso-shade" data-shade={index} d={TAB_REST.shades[index] ?? ""} />
            ))}
            <path ref={part("top")} className="iso-top" d={TAB_REST.top} />
            <path ref={part("crease")} className="iso-line iso-crease" data-tone="faint" d={TAB_REST.crease} />
            <path ref={part("bevel")} className="iso-line iso-bevel" data-tone="faint" d={TAB_REST.bevel ?? ""} />
            <path ref={part("edge")} className="iso-line iso-edge" data-tone="hi" d={TAB_REST.outline} />
          </g>
          {props.tabsRight}
          <g ref={bind("stamp")} opacity={0}>
            <path className="iso-line" data-tone="hi" d={STAMP_ART.ring} />
            <path className="iso-line" data-tone="mid" d={STAMP_ART.inner} />
            <g className="al-bit" data-tone="hi">
              {STAMP_ART.dots.map(([x, y], index) => (
                <circle key={index} ref={slot(nodes.current.stampDots, index)} className="al-bit-dot" cx={tenth(x)} cy={tenth(y)} r={0.65} />
              ))}
            </g>
          </g>
          {props.cartFront}
        </g>
        {props.gateFront}
        <g ref={bind("bridge")}>{props.bridge}</g>
        <g ref={bind("ram")} transform={shift(0, 0, REST.ram * RAM_RISE)}>
          {props.ram}
        </g>
        {props.housing}
        {props.arm}
        {props.recorder}
        <clipPath id={`al-paper-${clip}`}>
          <path d={RECORDER_ART.clip} />
        </clipPath>
        <g clipPath={`url(#al-paper-${clip})`}>
          <path ref={bind("ruling")} className="iso-line" data-tone="lo" d={CHART_REST.ruling} />
          {CHART_REST.traces.map((d, index) => (
            <path key={index} ref={slot(nodes.current.traces, index)} className="iso-line al-trace" data-tone="hi" d={d} />
          ))}
        </g>
        {props.penRail}
        {props.pens.map((pen, index) => (
          <g key={index} ref={slot(nodes.current.pens, index)}>
            {pen}
          </g>
        ))}
        {props.recorderFront}
      </IsoFigure>
    </div>
  );
}


