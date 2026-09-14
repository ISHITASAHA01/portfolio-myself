import { Github, ExternalLink } from "lucide-react";
import project1 from "@/assets/python.jpg";
import project2 from "@/assets/DataEntry.png";
import project3 from "@/assets/imageconvertser.png";
import { Reveal, SectionHeading, TiltCard } from "./primitives";

const PROJECTS = [
  {
    title: "Location Tracking System",
    image: project1,
    description:
      "A Python-based location tracking application developed as a beginner project to explore geolocation, time zone information, and location-based data using Python libraries and APIs.",
    stack: ["Python", "Geopy", "Requests API", "Tkinter"],
    features: [
      "Location lookup",
      "Time zone information",
      "Simple Python GUI"
    ],
  },
  {
    title: "Data Entry Management System",
    image: project2,
    description:
      "Developed a responsive web application for managing employee and customer records with secure authentication and database integration using PHP and MySQL.",
    stack: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
    features: [
      "Secure Login System",
      "Add, Edit & Delete Records",
      "Search & Filter Data",
    ],
  },
  {
    title: "Image to Text Converter",
    image: project3,
    description:
      "A web-based OCR application that extracts editable text from images using an OCR API. Users can upload images and instantly retrieve text through a clean and responsive interface.",
    stack: ["HTML5", "CSS3", "JavaScript", "OCR API"],
    features: [
      "Image Upload",
      "OCR API Integration",
      "Text Extraction",
    ],
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Projects I've Built"
          description="A collection of HTML5 games, frontend projects, and interactive experiences developed using Phaser.js, JavaScript, and modern web technologies."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * i}>
              <TiltCard className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl glass gradient-border transition-all duration-300 hover:-translate-y-2 hover:glow-cyan">
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.title} gameplay screenshot`}
                      width={1280}
                      height={800}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute inset-0 translate-y-4 bg-neon-violet/15 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.stack.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-neon-violet/30 bg-neon-violet/10 px-3 py-1 font-alt text-xs text-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon-cyan" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2 pt-2">
                      {/* <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 font-alt text-sm hover:bg-white/5"
                      >
                        <Github className="size-4" aria-hidden /> GitHub
                      </a> */}
                      <a
                      // href="https://example.com"
                      // target="_blank"
                      // rel="noreferrer noopener"
                      // className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-alt text-sm font-semibold text-primary-foreground"
                      // style={{ background: "var(--gradient-neon)" }}
                      >
                        {/* <ExternalLink className="size-4" aria-hidden /> Live Demo */}
                      </a>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}