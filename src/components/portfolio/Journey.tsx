import { Briefcase, GraduationCap } from "lucide-react";
import { EDUCATION, EXPERIENCE } from "./data";
import { Reveal, SectionHeading } from "./primitives";

export function Journey() {
  return (
    <section id="experience" className="relative px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience & education"
          title="Professional Journey"
          description="My experience, education, and continuous growth as a Frontend Game Developer specializing in HTML5 games."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-8 flex items-center gap-3 font-display text-xl font-semibold">
              <span className="grid size-10 place-items-center rounded-xl glass text-neon-violet">
                <Briefcase className="size-5" aria-hidden />
              </span>
              Experience
            </h3>
            <ol className="relative space-y-6 border-l border-white/10 pl-6">
              {EXPERIENCE.map((e, i) => (
                <Reveal key={e.role} delay={0.08 * i}>
                  <li className="relative rounded-2xl glass gradient-border p-6 transition-transform duration-300 hover:-translate-y-1">
                    <span className="absolute top-8 -left-[31px] size-3 rounded-full bg-neon-violet shadow-[0_0_16px_5px_rgba(139,92,246,0.5)]" />
                    <p className="font-alt text-xs tracking-widest text-neon-cyan uppercase">
                      {e.duration}
                    </p>
                    <h4 className="mt-2 font-display text-lg font-semibold">{e.role}</h4>
                    <p className="text-sm text-muted-foreground">{e.company}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon-rose" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div id="education">
            <h3 className="mb-8 flex items-center gap-3 font-display text-xl font-semibold">
              <span className="animate-float grid size-10 place-items-center rounded-xl glass text-neon-cyan">
                <GraduationCap className="size-5" aria-hidden />
              </span>
              Education
            </h3>
            <ol className="relative space-y-6 border-l border-white/10 pl-6">
              {EDUCATION.map((e, i) => (
                <Reveal key={e.degree} delay={0.08 * i}>
                  <li className="relative rounded-2xl glass gradient-border p-6 transition-transform duration-300 hover:-translate-y-1">
                    <span className="absolute top-8 -left-[31px] size-3 rounded-full bg-neon-cyan shadow-[0_0_16px_5px_rgba(6,182,212,0.5)]" />
                    <p className="font-alt text-xs tracking-widest text-neon-rose uppercase">
                      {e.duration}
                    </p>
                    <h4 className="mt-2 font-display text-lg font-semibold">{e.degree}</h4>
                    <p className="text-sm text-muted-foreground">{e.school}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{e.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}