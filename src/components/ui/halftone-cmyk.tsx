"use client"

import { cn } from "@/lib/utils"

interface HalftoneCMYKProps {
  className?: string
  spacing?: number
  dotRadius?: number
}

// Single-color halftone — stamp / postal purple, like image #6
const STAMP_PURPLE = "rgba(158, 100, 158, 0.72)"

export function HalftoneCMYK({ className, spacing = 6, dotRadius = 2.2 }: HalftoneCMYKProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Halftone dot screen — 45° classic single-color print angle */}
      <div
        className="absolute"
        style={{
          inset: "-150%",
          backgroundImage: `radial-gradient(circle, ${STAMP_PURPLE} ${dotRadius}px, transparent ${dotRadius}px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
          transform: "rotate(45deg)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Subtle tint wash so the purple registers on the white canvas */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(158, 100, 158, 0.08)",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  )
}
