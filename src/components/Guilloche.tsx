"use client";

import { useEffect, useRef } from "react";

export default function Guilloche() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.strokeStyle = getComputedStyle(document.documentElement)
        .getPropertyValue("--guilloche")
        .trim();
      ctx.lineWidth = 0.55;

      const cx = rect.width * 0.83;
      const cy = rect.height * 0.48;
      const R = Math.min(rect.width, rect.height) * 0.6;

      for (let k = 0; k < 44; k++) {
        ctx.beginPath();
        const a = (k / 44) * Math.PI * 2;
        for (let t = 0; t <= 360; t += 1.5) {
          const th = (t * Math.PI) / 180;
          const rad =
            R * (0.5 + 0.34 * Math.cos(7 * th + a)) +
            R * 0.2 * Math.sin(3 * th + a * 2);
          const px = cx + rad * Math.cos(th);
          const py = cy + rad * Math.sin(th) * 0.62;
          if (t === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
    };

    draw();
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(draw, 180);
    };
    window.addEventListener("resize", onResize);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", draw);
    return () => {
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", draw);
      clearTimeout(timer);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
