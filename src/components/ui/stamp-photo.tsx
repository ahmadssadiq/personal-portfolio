"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface StampPhotoProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
}

/* ── constants ───────────────────────────────────────────────────────── */
const B  = 16;  // border thickness (px)
const PR = 4;   // perforation hole radius (px)
const PS = 11;  // perforation step — spacing between hole centres (px)

/* ── stamp perforation mask ──────────────────────────────────────────── */
// Each edge has a row/column of radial-gradients that punch transparent
// semicircles along the outer edge of the cream border.
// mask-composite: intersect unions all holes → every edge gets cut out.

const MASK_IMAGES = [
  `radial-gradient(circle at 50% 0%,   transparent ${PR}px, #000 ${PR}px)`,  // top
  `radial-gradient(circle at 50% 100%, transparent ${PR}px, #000 ${PR}px)`,  // bottom
  `radial-gradient(circle at 0%  50%,  transparent ${PR}px, #000 ${PR}px)`,  // left
  `radial-gradient(circle at 100% 50%, transparent ${PR}px, #000 ${PR}px)`,  // right
  `linear-gradient(#000 0 0)`,                                                 // fill
].join(', ');

const MASK_POSITIONS = [`0 0`, `0 100%`, `0 0`, `100% 0`, `0 0`].join(', ');
const MASK_SIZES     = [
  `${PS}px ${B}px`,
  `${PS}px ${B}px`,
  `${B}px ${PS}px`,
  `${B}px ${PS}px`,
  `100% 100%`,
].join(', ');
const MASK_REPEAT    = `repeat-x, repeat-x, repeat-y, repeat-y, no-repeat`;
const MASK_COMPOSITE         = `intersect, intersect, intersect, intersect, add`;
const WEBKIT_MASK_COMPOSITE  = `source-in, source-in, source-in, source-in, source-over`;

/* ── CMYK halftone dot layers ────────────────────────────────────────── */
// Four angled dot screens at classic CMYK angles with slight X/Y
// misregistration offsets for the authentic offset-print feel.

interface DotLayerStyle extends React.CSSProperties {
  position: 'absolute';
  inset: string;
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition?: string;
  transform?: string;
  mixBlendMode: 'multiply';
  pointerEvents: 'none';
}

function dotLayer(
  color: string,
  angleDeg: number,
  spacing: number,
  radius: number,
  offX = 0,
  offY = 0,
): DotLayerStyle {
  return {
    position:        'absolute',
    inset:           '-150%',
    backgroundImage: `radial-gradient(circle, ${color} ${radius}px, transparent ${radius}px)`,
    backgroundSize:  `${spacing}px ${spacing}px`,
    backgroundPosition: offX || offY ? `${offX}px ${offY}px` : undefined,
    transform:       angleDeg !== 0 ? `rotate(${angleDeg}deg)` : undefined,
    mixBlendMode:    'multiply',
    pointerEvents:   'none',
  };
}

/* ── component ───────────────────────────────────────────────────────── */
export function StampPhoto({ src, alt, label, className, priority }: StampPhotoProps) {
  return (
    <div
      className={cn("block w-full", className)}
      style={{}}
    >
      {/* Stamp body — aged cream paper with perforated edges */}
      <div
        style={{
          background: '#f0ebe0',
          padding: `${B}px`,
          maskImage:               MASK_IMAGES,
          WebkitMaskImage:         MASK_IMAGES,
          maskPosition:            MASK_POSITIONS,
          WebkitMaskPosition:      MASK_POSITIONS,
          maskSize:                MASK_SIZES,
          WebkitMaskSize:          MASK_SIZES,
          maskRepeat:              MASK_REPEAT,
          WebkitMaskRepeat:        MASK_REPEAT,
          maskComposite:           MASK_COMPOSITE,
          WebkitMaskComposite:     WEBKIT_MASK_COMPOSITE,
        }}
      >
        {/* Image area + CMYK halftone layers */}
        <div style={{ position: 'relative', overflow: 'hidden', display: 'block' }}>
          <Image
            src={src}
            alt={alt}
            width={300}
            height={400}
            className="object-cover block w-full"
            priority={priority}
          />

          {/* Label — vintage serif, overlaid on image bottom-left */}
          {label && (
            <div
              style={{
                position:   'absolute',
                bottom:     9,
                left:       10,
                color:      '#fff',
                fontFamily: "var(--font-serif, Georgia, 'Times New Roman', serif)",
                fontSize:   15,
                fontWeight: 400,
                letterSpacing: '0.03em',
                textShadow: '0 1px 4px rgba(0,0,0,0.75)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
