import * as React from "react";
import { Dots, Line, Solid } from "@/components/iso/react/draw";
import { BASE_ART, CARD_ART, CART_ART, GATE_ART, PRESS_ART, RACK_ART, RAIL_ART, RECORDER_ART, TAB_ART, TRAY_ART } from "./geometry";
import { AgentLineLive } from "./live";

// Every static part, built once on the server. Each root carries a stable key so the
// streamed element props never trip React's list-key check.

const BASE = (
  <g key="base">
    <path className="iso-halo" d={BASE_ART.halo} />
    {BASE_ART.feet.map((parts, index) => (
      <g key={index}>
        {parts.map((paths, part) => (
          <Solid key={part} paths={paths} tone={part ? "mid" : "lo"} crease="faint" />
        ))}
      </g>
    ))}
    <Solid paths={BASE_ART.slab} tone="mid" crease="faint" />
    <Line d={BASE_ART.groove} tone="lo" />
    <Line d={BASE_ART.screwRings} tone="lo" />
    <Dots points={BASE_ART.screws} size={0.5} tone="mid" />
    <Solid paths={BASE_ART.label} tone="lo" crease="none" />
    <Line d={BASE_ART.labelLine} tone="faint" />
    <Line d={BASE_ART.labelRule} tone="lo" free />
    <Dots points={BASE_ART.labelScrews} size={0.45} tone="mid" />
  </g>
);

const RACK = (
  <g key="rack">
    <Solid paths={RACK_ART.shelf} tone="lo" crease="faint" />
    {RACK_ART.slots.map((d, index) => (
      <Line key={index} d={d} tone="faint" />
    ))}
    <Solid paths={RACK_ART.wall} tone="mid" crease="faint" />
    <Dots points={RACK_ART.wallScrews} size={0.5} tone="mid" />
    <Solid paths={RACK_ART.endLeft} tone="mid" crease="faint" />
    <Solid paths={RACK_ART.endRight} tone="mid" crease="faint" />
  </g>
);

const TRAYS = TRAY_ART.map((tray, index) => (
  <g key={`tray-${index}`}>
    <Solid paths={tray.body} tone="mid" crease="faint" />
    <Line d={tray.pocket} tone="faint" />
    {tray.tools.map((paths, part) => (
      <Solid key={part} paths={paths} tone="mid" crease="faint" />
    ))}
    <Solid paths={tray.handle} tone="mid" crease="faint" />
    <Line d={tray.handleLine} tone="lo" free />
  </g>
));

const GATE_BACK = (
  <g key="gate-back">
    <Solid paths={GATE_ART.backPad} tone="lo" crease="faint" />
    <Dots points={GATE_ART.backScrews} size={0.45} tone="mid" />
    <Solid paths={GATE_ART.backPost} tone="mid" crease="faint" />
  </g>
);

const PRESS_POST = (
  <g key="press-post">
    <Solid paths={PRESS_ART.pad} tone="lo" crease="faint" />
    <Dots points={PRESS_ART.padScrews} size={0.45} tone="mid" />
    <Solid paths={PRESS_ART.post} tone="mid" crease="faint" inner={<Line d={PRESS_ART.postSeam} tone="faint" />} />
    <Solid paths={PRESS_ART.lockPlate} tone="lo" crease="none" />
    <Line d={PRESS_ART.lockRing} tone="mid" />
    <Line d={PRESS_ART.lockHole} tone="hi" />
    <Line d={PRESS_ART.lockMarks} tone="lo" free />
    <Solid paths={PRESS_ART.idPlate} tone="lo" crease="none" />
    <Line d={PRESS_ART.idRule} tone="lo" free />
  </g>
);

const RAILS = (
  <g key="rails">
    {RAIL_ART.stops.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <Dots points={RAIL_ART.stopScrews} size={0.45} tone="mid" />
    {RAIL_ART.rails.map((paths, index) => (
      <Solid key={index} paths={paths} tone="lo" crease="faint" />
    ))}
    <Line d={RAIL_ART.ticksMinor} tone="lo" />
    <Line d={RAIL_ART.ticksMajor} tone="mid" />
    <Dots points={RAIL_ART.screws} size={0.45} tone="mid" />
  </g>
);

const CART_BACK = (
  <g key="cart-back">
    <path className="iso-halo al-shadow" d={CART_ART.halo} />
    {CART_ART.skirtsBack.map((paths, index) => (
      <Solid key={index} paths={paths} tone="lo" crease="faint" />
    ))}
    <Solid paths={CART_ART.plate} tone="mid" crease="faint" />
    <Line d={CART_ART.seat} tone="faint" />
    <Dots points={CART_ART.rivets} size={0.45} tone="lo" />
  </g>
);

const CARD = (
  <g key="card">
    <Solid paths={CARD_ART.card} tone="hi" crease="faint" lit />
    <Line d={CARD_ART.rules} tone="lo" free />
    <Line d={CARD_ART.zone} tone="mid" dotted />
  </g>
);

const TABS_LEFT = (
  <g key="tabs-left">
    <Solid paths={TAB_ART[0]!} tone="hi" crease="faint" />
    <Solid paths={TAB_ART[1]!} tone="hi" crease="faint" />
  </g>
);

const TABS_RIGHT = (
  <g key="tabs-right">
    <Solid paths={TAB_ART[3]!} tone="hi" crease="faint" />
    <Solid paths={TAB_ART[4]!} tone="hi" crease="faint" />
  </g>
);

const CART_FRONT = (
  <g key="cart-front">
    {CART_ART.skirtsFront.map((paths, index) => (
      <Solid key={index} paths={paths} tone="lo" crease="faint" />
    ))}
  </g>
);

const GATE_FRONT = (
  <g key="gate-front">
    <Solid paths={GATE_ART.frontPad} tone="lo" crease="faint" />
    <Dots points={GATE_ART.frontScrews} size={0.45} tone="mid" />
    <Solid paths={GATE_ART.frontPost} tone="mid" crease="faint" />
    <Solid paths={GATE_ART.strip} tone="lo" crease="none" />
    <Line d={GATE_ART.ticksMinor} tone="lo" />
    <Line d={GATE_ART.ticksMajor} tone="mid" />
  </g>
);

const BRIDGE = (
  <g key="bridge">
    <Solid paths={GATE_ART.bridge} tone="mid" crease="faint" />
    <Line d={GATE_ART.bridgeLine} tone="faint" />
    <Line d={GATE_ART.bridgeRules} tone="lo" free />
    <Dots points={GATE_ART.bridgeScrews} size={0.45} tone="mid" />
  </g>
);

const RAM = (
  <g key="ram">
    <Solid paths={PRESS_ART.rod} tone="mid" crease="none" />
    <Solid paths={PRESS_ART.die} tone="mid" crease="faint" />
    <Line d={PRESS_ART.dieRing} tone="lo" />
  </g>
);

const HOUSING = (
  <g key="housing">
    <Solid paths={PRESS_ART.housing} tone="mid" crease="faint" />
    <Line d={PRESS_ART.housingSeam} tone="faint" />
  </g>
);

const ARM = (
  <g key="arm">
    <Solid paths={PRESS_ART.arm} tone="mid" crease="faint" />
    <Line d={PRESS_ART.armLine} tone="faint" />
    <Dots points={PRESS_ART.armScrews} size={0.45} tone="mid" />
  </g>
);

const RECORDER = (
  <g key="recorder">
    <path className="iso-halo" d={RECORDER_ART.halo} />
    <Solid paths={RECORDER_ART.left} tone="mid" crease="faint" />
    <Solid paths={RECORDER_ART.right} tone="mid" crease="faint" />
    <Solid paths={RECORDER_ART.back} tone="mid" crease="faint" />
    <Dots points={RECORDER_ART.backScrews} size={0.5} tone="mid" />
    <Solid paths={RECORDER_ART.paper} tone="mid" crease="none" className="al-paper" />
    <Line d={RECORDER_ART.columns} tone="faint" />
  </g>
);

const RECORDER_FRONT = (
  <g key="recorder-front">
    <Solid paths={RECORDER_ART.front} tone="mid" crease="faint" />
    <Dots points={RECORDER_ART.frontScrews} size={0.5} tone="mid" />
  </g>
);

const PEN_RAIL = (
  <g key="pen-rail">
    <Solid paths={RECORDER_ART.penRail} tone="mid" crease="faint" />
  </g>
);

const PENS = RECORDER_ART.pens.map((pen, index) => (
  <g key={`pen-${index}`}>
    <Solid paths={pen.arm} tone="mid" crease="faint" />
    <Dots points={[pen.pivot]} size={0.5} tone="mid" />
    <Dots points={[pen.tip]} size={0.8} tone="hi" />
  </g>
));

const LABEL =
  "An agent line, drawn as a machine. A job card rides a rail past a rack of four tool drawers, through a gate that only lets a card through if its fields fit, and under a keyed press that stamps it with the agent's seal. In front of the rail a strip-chart recorder has one pen per station, and each pen draws a spike on the moving paper every time its station acts.";

export function AgentLineArt() {
  return (
    <AgentLineLive
      label={LABEL}
      base={BASE}
      rack={RACK}
      trays={TRAYS}
      gateBack={GATE_BACK}
      pressPost={PRESS_POST}
      rails={RAILS}
      cartBack={CART_BACK}
      card={CARD}
      tabsLeft={TABS_LEFT}
      tabsRight={TABS_RIGHT}
      cartFront={CART_FRONT}
      gateFront={GATE_FRONT}
      bridge={BRIDGE}
      ram={RAM}
      housing={HOUSING}
      arm={ARM}
      recorder={RECORDER}
      recorderFront={RECORDER_FRONT}
      penRail={PEN_RAIL}
      pens={PENS}
    />
  );
}
