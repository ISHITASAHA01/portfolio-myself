import { GraduationCap, Target, Trophy, Sparkles } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { Reveal, SectionHeading, TiltCard } from "./primitives";

const TIMELINE = [
  {
    Icon: GraduationCap,
    title: "Education",
    body: "Completed BCA and MCA with a passion for software and game development.",
  },
  {
    Icon: Sparkles,
    title: "Learning Phaser.js",
    body: "Explored HTML5 game development, JavaScript, Canvas API, and responsive game design.",
  },
  {
    Icon: Trophy,
    title: "Professional Experience",
    body: "Worked as a Frontend Game Developer, building casino and casual games using Phaser.js and JavaScript.",
  },
  {
    Icon: Target,
    title: "Future Goals",
    body: "Seeking opportunities to develop engaging HTML5 games and grow as a game developer.",
  },
];
export function About() {
  return (
    <section id="about" className="relative px-4 py-0">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About me"
          title="Passionate about games, driven by code."
          description="Turning ideas into interactive HTML5 gaming experiences with Phaser.js."
        />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <TiltCard className="relative">
              <div className="relative overflow-hidden rounded-[2rem] glass gradient-border p-2">
                <img
                  src={portrait}
                  alt="Ishita Saha working at her game development studio desk"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
                />
                <div className="pointer-events-none absolute inset-2 rounded-[1.6rem] bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute right-6 bottom-6 left-6 rounded-2xl glass px-4 py-3">
                  <p className="font-display text-sm font-semibold">Ishita Saha</p>
                  <p className="font-alt text-xs text-muted-foreground">
                    Frontend Game Developer · JavaScript · Phaser.js
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-muted-foreground sm:text-lg">

                Passionate about developing high-quality HTML5 games with Phaser.js. I focus
                on clean code, responsive gameplay, and creating enjoyable gaming experiences
                while ensuring performance and scalability.

              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-muted-foreground sm:text-lg">
                I&apos;ve worked across mobile, PC and console productions, from six-person indie
                teams to multi-studio pipelines, and I love mentoring designers into the tools I
                build for them.
              </p>
            </Reveal>

            <ol className="mt-10 space-y-4">
              {TIMELINE.map((item, i) => (
                <Reveal key={item.title} delay={0.08 * i}>
                  <li className="group relative flex gap-4 rounded-2xl glass gradient-border p-5 transition-transform duration-300 hover:-translate-y-1">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5 text-neon-cyan transition-colors group-hover:text-neon-rose">
                      <item.Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                    </div>
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