import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import project1 from "@/assets/python.jpg";
import project2 from "@/assets/DataEntry.png";
import project3 from "@/assets/imageconvertser.png";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import { Reveal, SectionHeading } from "./primitives";

const SHOTS = [
  { src: gallery1, alt: "NovaCart e-commerce application built with React", tall: true },
  { src: project1, alt: "Python project with application and data processing" },
  { src: gallery2, alt: "Crystal Orbit game showcase" },
  { src: project2, alt: "PHP database management system" },
  { src: project3, alt: "JavaScript application with REST API integration", tall: true },
];


export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="gallery" className="relative px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Gallery"
          title="Frames from the worlds"
          description="Screenshots and concept frames captured across shipped and in-progress builds."
        />

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {SHOTS.map((s, i) => (
            <Reveal key={s.alt} delay={0.05 * i} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-3xl glass gradient-border p-1.5"
                aria-label={`Open larger view: ${s.alt}`}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className={`w-full rounded-[1.35rem] object-cover transition-transform duration-700 group-hover:scale-105 ${s.tall ? "aspect-[4/5]" : "aspect-[16/10]"
                    }`}
                />
                <span className="pointer-events-none absolute inset-1.5 rounded-[1.35rem] bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-5 left-5 translate-y-3 text-left font-alt text-sm text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {s.alt}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-background/90 p-4 backdrop-blur-xl"
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              src={SHOTS[open]!.src}
              alt={SHOTS[open]!.alt}
              className="max-h-[85dvh] w-auto rounded-3xl object-contain glow-violet"
            />
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close preview"
              className="absolute top-6 right-6 grid size-11 place-items-center rounded-full glass"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}