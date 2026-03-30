"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { HalftoneCMYK } from "@/components/ui/halftone-cmyk";

/* ─── CrowdCanvas ──────────────────────────────────────────────────── */

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
  className?: string;
}

export const CrowdCanvas = ({
  src,
  rows = 15,
  cols = 7,
  className,
}: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── utils ────────────────────────────────────────────────────────
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: unknown[]) => (randomRange(0, array.length) | 0);
    const removeFromArray = <T,>(array: T[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = <T,>(array: T[], item: T) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = <T,>(array: T[]) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = <T,>(array: T[]) =>
      array[randomIndex(array) | 0];

    // ── types ────────────────────────────────────────────────────────
    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: gsap.core.Timeline | null;
      setRect: (r: number[]) => void;
      render: (c: CanvasRenderingContext2D) => void;
    };

    // ── peep factory ─────────────────────────────────────────────────
    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect(r) {
          peep.rect = r;
          peep.width = r[2];
          peep.height = r[3];
        },
        render(c) {
          c.save();
          c.translate(peep.x, peep.y);
          c.scale(peep.scaleX, 1);
          c.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height,
          );
          c.restore();
        },
      };
      peep.setRect(rect);
      return peep;
    };

    // ── reset / walk ─────────────────────────────────────────────────
    const stage = { width: 0, height: 0 };

    const resetPeep = (peep: Peep) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY =
        100 - 250 * (gsap.parseEase("power2.in") as (n: number) => number)(Math.random());
      const startY = stage.height - peep.height + offsetY;

      let startX: number, endX: number;
      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return { startX, startY, endX };
    };

    const normalWalk = (peep: Peep) => {
      const { startY, endX } = resetPeep(peep);
      const xDur = 10;
      const yDur = 0.25;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, { duration: xDur, x: endX, ease: "none" }, 0);
      tl.to(
        peep,
        { duration: yDur, repeat: xDur / yDur, yoyo: true, y: startY - 10 },
        0,
      );
      return tl;
    };

    // ── crowd management ─────────────────────────────────────────────
    const img = document.createElement("img");
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const rw = w / rows;
      const rh = h / cols;
      for (let i = 0; i < rows * cols; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [(i % rows) * rw, ((i / rows) | 0) * rh, rw, rh],
          }),
        );
      }
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = normalWalk(peep).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });
      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk!.progress(Math.random());
      }
    };

    // ── render loop ──────────────────────────────────────────────────
    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      crowd.forEach((p) => p.render(ctx));
      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;
      crowd.forEach((p) => p.walk?.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      initCrowd();
    };

    const init = () => {
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((p) => p.walk?.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute bottom-0 w-full", className)}
    />
  );
};

/* ─── FooterCrowd — canvas + CMYK halftone for footer hover ───────── */

export const FooterCrowd = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* White base so purple multiply blend reads correctly */}
    <div className="absolute inset-0 bg-background" />

    {/* Walking peeps fill the zone — heads visible because zone is tall enough */}
    <CrowdCanvas
      src="/images/peeps/all-peeps.png"
      rows={15}
      cols={7}
      className="h-full opacity-85"
    />

    {/* Single-color stamp-purple halftone overlay */}
    <HalftoneCMYK spacing={6} dotRadius={2.2} />

    {/* Soft fade at the top so crowd emerges from page naturally */}
    <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent" />
  </div>
);
