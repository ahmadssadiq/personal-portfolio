import { Plate } from "@/components/iso/react/draw";
import "@/components/iso/iso.css";
import "./agent-line.css";
import { AgentLineArt } from "./art";

interface Props {
  fig?: string;
  // "auto" sits transparently on the page and follows the site's light/dark toggle.
  // "light" and "dark" keep their own card, whatever the page is doing.
  theme?: "auto" | "light" | "dark";
}

export function AgentLineFigure({ fig = "Fig 1", theme = "auto" }: Props) {
  return (
    <div className={theme === "auto" ? "iso al-figure al-auto" : "iso al-figure"} data-theme={theme === "dark" ? "dark" : "light"}>
      <Plate
        fig={fig}
        title="An agent step"
        hint="Click a drawer · B bad card"
        readout="idle · tool 2 next"
        keys={[
          { mark: "lit", label: "The job card, whatever is being checked" },
          { mark: "edge", label: "The trace each station draws" },
          { mark: "dotted", label: "Where the seal lands" },
        ]}
        caption="One agent step, drawn as a machine. A card goes to the drawer for its tool, is checked at the gate against its schema and sent back if a field doesn't fit, and is sealed by a press that only turns with the agent's own key. The recorder in front draws what every station did. An illustration of the design, not measured data."
      >
        <AgentLineArt />
      </Plate>
    </div>
  );
}
