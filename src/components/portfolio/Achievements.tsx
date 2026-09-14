
import { ACHIEVEMENTS } from "./data";
import { Reveal } from "./primitives";

export function Achievements() {
  return (
    <section id="achievements" className="relative px-4 py-18">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-3 rounded-[1.5rem] glass gradient-border p-5 sm:grid-cols-3 lg:grid-cols-5">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.label} delay={0.06 * i}>
              <div className="group text-center">
                <p className="font-display text-1xl font-bold text-gradient sm:text-4xl">
                  {a.value}
                </p>

                <p className="mt-2 font-alt text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  {a.label}

                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}