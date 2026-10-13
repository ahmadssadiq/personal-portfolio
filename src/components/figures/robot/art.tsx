import * as React from "react";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import { BASE_ART, BENCH_ART, MOUNT_ART, WHEELS } from "./geometry";

// Every part that never changes shape. Wheels and the base ride in one moving group, so they
// are built at rest here and the live component moves them.

export const BENCH = (
  <g key="bench">
    <path className="iso-halo" d={BENCH_ART.halo} />
    {BENCH_ART.feet.map((parts, index) => (
      <g key={index}>
        {parts.map((paths, part) => (
          <Solid key={part} paths={paths} tone={part ? "mid" : "lo"} crease="faint" />
        ))}
      </g>
    ))}
    <Solid paths={BENCH_ART.slab} tone="lo" crease="faint" />
    <Line d={BENCH_ART.groove} tone="faint" />
    <Line d={BENCH_ART.screwRings} tone="lo" />
    <Dots points={BENCH_ART.screws} size={0.5} tone="mid" />
    <Solid paths={BENCH_ART.strip} tone="lo" crease="none" />
    <Line d={BENCH_ART.ticksMinor} tone="lo" />
    <Line d={BENCH_ART.ticksMajor} tone="mid" />
    <Solid paths={BENCH_ART.label} tone="lo" crease="none" />
    <Line d={BENCH_ART.labelLine} tone="faint" />
    <Line d={BENCH_ART.labelRule} tone="lo" free />
    <Dots points={BENCH_ART.labelScrews} size={0.45} tone="mid" />
  </g>
);

export const WHEEL_BODY = WHEELS.map((wheel, index) => (
  <g key={`wheel-${index}`}>
    <Solid paths={wheel.body} tone="mid" crease="lo" />
    <Line d={wheel.hub} tone="lo" />
    <Line d={wheel.axle} tone="mid" />
  </g>
));

export const WHEEL_SERVO = WHEELS.map((wheel, index) => <Solid key={`wheel-servo-${index}`} paths={wheel.servo} tone="lo" crease="faint" />);

export const DECKS = (
  <g key="decks">
    <Solid paths={BASE_ART.lower} tone="mid" crease="faint" />
    <Line d={BASE_ART.lowerLine} tone="faint" />
    {BASE_ART.between.map((item, index) => (
      <g key={index}>
        <Solid paths={item.paths} tone={item.tone} crease="faint" />
        {item.line ? <Line d={item.line} tone="lo" free /> : null}
        {item.dots ? <Dots points={item.dots} size={0.45} tone="mid" /> : null}
      </g>
    ))}
    <Solid paths={BASE_ART.upper} tone="mid" crease="faint" />
    <Line d={BASE_ART.upperLine} tone="faint" />
    <Dots points={BASE_ART.upperScrews} size={0.55} tone="mid" />
  </g>
);

export const MOUNT = (
  <g key="mount">
    <Solid paths={MOUNT_ART.flange} tone="hi" crease="faint" />
    <Dots points={MOUNT_ART.flangeScrews} size={0.5} tone="mid" />
    <Solid paths={MOUNT_ART.housing} tone="hi" crease="faint" inner={<Line d={MOUNT_ART.housingSeam} tone="faint" />} />
    <Line d={MOUNT_ART.housingLine} tone="faint" />
    <Solid paths={MOUNT_ART.horn} tone="mid" crease="faint" />
    <Solid paths={MOUNT_ART.turret} tone="hi" crease="faint" />
    <Solid paths={MOUNT_ART.block} tone="hi" crease="faint" />
  </g>
);

export const SHOULDER = (
  <g key="shoulder">
    <Solid paths={MOUNT_ART.shoulderServo} tone="mid" crease="faint" />
    <Solid paths={MOUNT_ART.shoulderHorn} tone="mid" crease="faint" />
  </g>
);

export const LABEL =
  "An SO-101 robot arm on a LeKiwi mobile base, standing on a bench. The base is two plates on standoffs with a battery and a Raspberry Pi between them, on three omni wheels. The arm reaches forward on three pitch joints, shoulder, elbow and wrist, each a servo, and ends in a two jaw gripper. As it stretches out, the torque the shoulder servo has to hold climbs.";
