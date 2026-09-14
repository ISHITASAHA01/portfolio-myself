import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Animated gradient orbs + particle canvas background. */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const count = Math.min(90, Math.round(w / 16));
    const colors = ["139,92,246", "6,182,212", "244,63,94"];
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      c: colors[Math.floor(Math.random() * colors.length)],
      a: Math.random() * 0.5 + 0.2,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = w;
        if (d.x > w) d.x = 0;
        if (d.y < 0) d.y = h;
        if (d.y > h) d.y = 0;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${d.c},${d.a})`;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="animate-drift absolute -top-40 -left-32 size-[38rem] rounded-full bg-neon-violet/20 blur-[120px]" />
      <div className="animate-drift absolute top-1/3 -right-40 size-[34rem] rounded-full bg-neon-cyan/15 blur-[130px] [animation-delay:-6s]" />
      <div className="animate-drift absolute bottom-0 left-1/3 size-[30rem] rounded-full bg-neon-rose/10 blur-[130px] [animation-delay:-12s]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 0%, #000 20%, transparent 75%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}

/** Glowing cursor + spotlight follower (desktop only). */
export function CursorGlow() {
  const x = useSpring(useMotionValue(-200), { stiffness: 500, damping: 40 });
  const y = useSpring(useMotionValue(-200), { stiffness: 500, damping: 40 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="size-[26rem] rounded-full bg-neon-violet/10 blur-[90px]" />
      <div className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan shadow-[0_0_18px_6px_rgba(6,182,212,0.45)]" />
    </motion.div>
  );
}

/** Top scroll progress bar. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full origin-left transition-[width] duration-150"
        style={{ width: `${progress}%`, background: "var(--gradient-neon)" }}
      />
    </div>
  );
}

/** Cinematic loading screen. */
export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 220);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: pct >= 100 ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <p className="font-display text-2xl font-bold tracking-[0.3em] text-gradient">ISHITA</p>
      <div className="mt-6 h-1 w-56 overflow-hidden rounded-full bg-white/10">
        <div className="h-full" style={{ width: `${pct}%`, background: "var(--gradient-neon)" }} />
      </div>
      <p className="mt-3 font-alt text-xs tracking-[0.3em] text-muted-foreground">
        LOADING WORLD {pct}%
      </p>
    </motion.div>
  );
}