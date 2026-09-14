import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "./data";
import { SectionHeading } from "./primitives";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index]!;

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="testimonials" className="relative px-4 py-24">
      <div className="mx-auto max-w-4xl">
        {/* <SectionHeading eyebrow="Testimonials" title="What I Build" /> */}

        <div className="relative min-h-[19rem] rounded-[2rem] glass gradient-border p-8 sm:min-h-[16rem] sm:p-12">
          <Quote className="size-8 text-neon-violet" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
            >
              <p className="text-balance text-lg leading-relaxed sm:text-xl">
                &ldquo;{active.quote}&rdquo;
              </p>
              <footer className="mt-6 font-alt text-sm">
                <span className="font-semibold">{active.name}</span>
                <span className="text-muted-foreground"> — {active.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-neon-cyan" : "w-3 bg-white/20"
                    }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="grid size-11 place-items-center rounded-full glass hover:bg-white/10"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
                className="grid size-11 place-items-center rounded-full glass hover:bg-white/10"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}