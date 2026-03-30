"use client";

import { cn } from "@/lib/utils";

interface SquigglyArrowProps {
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
  direction?: "right" | "left" | "up" | "down";
  variant?: "wavy" | "bouncy" | "smooth";
}

const PATHS = {
  wavy: {
    line: "M 10,50 C 40,20 60,80 90,50 C 120,20 140,80 170,50 C 185,35 192,42 195,50",
    arrow: "M 185,35 L 195,50 L 182,58",
  },
  bouncy: {
    line: "M 10,50 C 30,10 50,90 80,50 C 100,25 115,70 140,50 C 158,35 168,28 180,50",
    arrow: "M 168,32 L 180,50 L 165,55",
  },
  smooth: {
    line: "M 10,50 C 60,15 80,85 130,50 C 155,33 168,38 178,50",
    arrow: "M 166,36 L 178,50 L 164,58",
  },
};

const ROTATIONS: Record<string, number> = {
  right: 0,
  left: 180,
  down: 90,
  up: -90,
};

export default function SquigglyArrow({
  width = 200,
  height = 100,
  strokeWidth = 2.5,
  className,
  direction = "right",
  variant = "wavy",
}: SquigglyArrowProps) {
  const { line, arrow } = PATHS[variant];
  const rotation = ROTATIONS[direction];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-current", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path
        d={line}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={arrow}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
