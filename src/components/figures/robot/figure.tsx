import { Plate } from "@/components/iso/react/draw";
import "@/components/iso/iso.css";
import "@/components/iso/site-theme.css";
import "./robot.css";
import { RESTING_READOUT, RobotLive } from "./live";

export function RobotFigure() {
  return (
    <div className="iso iso-site rb-figure" data-theme="light">
      <Plate
        fig="Fig 2"
        title="SO-101 on LeKiwi"
        hint="Drag ← → to reach"
        readout={RESTING_READOUT}
        caption="An SO-101 arm on a LeKiwi base. The readout is the torque its shoulder servo holds, against a 2.94 N·m stall. Shapes are approximate."
      >
        <RobotLive />
      </Plate>
    </div>
  );
}
