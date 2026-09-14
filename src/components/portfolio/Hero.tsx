import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Gamepad2, Download, Mail, Sparkles, Cpu, Joystick, Boxes, Rocket } from "lucide-react";
import { MagneticButton } from "./primitives";

const ROLES = ["Frontend Game Developer", "Phaser.js Developer", "JavaScript Developer"
];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[index] ?? "";
    const delay = deleting ? 40 : text === full ? 1600 : 70;
    const timer = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % ROLES.length);
      } else {
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <span aria-label={ROLES[0]}>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="ml-1 inline-block h-[1em] w-[3px] animate-pulse bg-neon-cyan align-middle" />
    </span>
  );
}

const FLOATERS = [
  { Icon: Joystick, className: "left-2 top-6", delay: 0 },
  { Icon: Cpu, className: "right-4 top-16", delay: 0.6 },
  { Icon: Boxes, className: "left-6 bottom-10", delay: 1.2 },
  { Icon: Rocket, className: "right-8 bottom-4", delay: 1.8 },
];

function ControllerOrb() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [18, -18]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-22, 22]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <div className="absolute inset-0 rounded-full bg-neon-violet/25 blur-[80px]" aria-hidden />
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative grid size-full place-items-center"
      >
        <motion.div
          className="absolute inset-6 rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-neon-cyan shadow-[0_0_16px_4px_rgba(6,182,212,0.6)]" />
        </motion.div>
        <motion.div
          className="absolute inset-14 rounded-full border border-dashed border-white/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-neon-rose shadow-[0_0_14px_4px_rgba(244,63,94,0.55)]" />
        </motion.div>

        <motion.div
          className="animate-float grid size-40 place-items-center rounded-[2rem] glass glow-violet sm:size-48"
          whileHover={{ scale: 1.06 }}
        >
          <Gamepad2 className="size-20 text-neon-cyan drop-shadow-[0_0_24px_rgba(6,182,212,0.6)] sm:size-24" aria-hidden />
        </motion.div>

        {FLOATERS.map(({ Icon, className, delay }, i) => (
          <motion.span
            key={i}
            className={`absolute ${className} grid size-12 place-items-center rounded-2xl glass`}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay }}
          >
            <Icon className="size-5 text-neon-violet" aria-hidden />
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-dvh items-center px-4 pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-alt text-xs tracking-[0.2em] text-muted-foreground uppercase"
          >
            <Sparkles className="size-3.5 text-neon-rose" aria-hidden />
            Available for Full-Time Frontend Game Developer opportunities.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-5xl leading-[0.95] font-bold sm:text-7xl xl:text-8xl"
          >
            Ishita <span className="text-gradient">Saha</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 font-alt text-xl text-neon-cyan sm:text-2xl"
          >
            <Typewriter />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 max-w-xl text-balance text-muted-foreground sm:text-lg"
          >
            Creating responsive, interactive, and engaging HTML5 games with clean code and optimized performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <MagneticButton href="#projects">
              <Gamepad2 className="size-4" aria-hidden /> View Projects
            </MagneticButton>
            <MagneticButton href="https://drive.google.com/file/d/1x_lhxQZkxc6iw7kw5Y92ZZ4OL_BcgqJu/view"
              rel="noopener noreferrer" variant="ghost">
              <Download className="size-4" aria-hidden /> Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              <Mail className="size-4" aria-hidden /> Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <ControllerOrb />
        </motion.div>
      </div>
    </section>
  );
}