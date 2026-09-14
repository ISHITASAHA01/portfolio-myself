import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { DISCIPLINES, SKILL_GROUPS } from "./data";
import { Reveal, SectionHeading } from "./primitives";

function Ring({ level, name }: { level: number; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const r = 30;
  const c = 2 * Math.PI * r;

  return (
    <div ref={ref} className="group flex flex-col items-center gap-2">
      <div className="relative size-[76px]">
        <svg viewBox="0 0 76 76" className="size-full -rotate-90" role="img" aria-label={`${name}: ${level} percent`}>
          <circle cx="38" cy="38" r={r} fill="none" stroke="oklch(1 0 0 / 0.1)" strokeWidth="5" />
          <motion.circle
            cx="38"
            cy="38"
            r={r}
            fill="none"
            stroke="url(#skillGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: inView ? c - (c * level) / 100 : c }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="skillGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="60%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 grid place-items-center font-alt text-sm font-semibold transition-transform duration-300 group-hover:scale-110">
          {level}%
        </span>
      </div>
      <span className="text-center text-xs text-muted-foreground">{name}</span>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="The toolkit behind the worlds"
          description="Engines, languages and disciplines I use daily to ship playable experiences."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={0.07 * i}>
              <div className="h-full rounded-3xl glass gradient-border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:glow-violet">
                <h3 className="mb-6 font-display text-lg font-semibold">{group.title}</h3>
                <div className="grid grid-cols-2 gap-5">
                  {group.items.map((s) => (
                    <Ring key={s.name} level={s.level} name={s.name} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 rounded-3xl glass gradient-border p-6">
            <h3 className="font-display text-lg font-semibold">Game Development</h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {DISCIPLINES.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-alt text-sm text-muted-foreground transition-colors hover:border-neon-cyan/50 hover:text-foreground"
                >
                  {d}
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}