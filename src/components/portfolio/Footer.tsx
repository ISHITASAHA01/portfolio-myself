import { useEffect, useState } from "react";
import { ArrowUp, Github, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { SECTIONS } from "./data";

const SOCIALS = [
  { Icon: Github, label: "GitHub", href: "https://github.com/ISHITASAHA01" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ishita-saha-36398a263" },
  // { Icon: MessageCircle, label: "Discord", href: "https://discord.com" },
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com/ishitasaha2002" },
];

export function FloatingSocials() {
  return (
    <div className="fixed top-1/2 left-4 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={s.label}
          className="grid size-11 place-items-center rounded-full glass text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-neon-cyan hover:glow-cyan"
        >
          <s.Icon className="size-4" aria-hidden />
        </a>
      ))}
      <span aria-hidden className="mx-auto h-16 w-px bg-gradient-to-b from-neon-violet to-transparent" />
    </div>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full glass glow-violet transition-transform hover:-translate-y-1"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[1.2fr_1fr_auto]">
        <div>
          <p className="font-display text-lg font-bold">
            Ishita Saha<span className="text-neon-violet">.</span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Frontend Game Developer passionate about creating interactive web-based gaming experiences.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-2 sm:justify-end">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={s.label}
              className="grid size-11 place-items-center rounded-full glass text-muted-foreground hover:text-neon-cyan"
            >
              <s.Icon className="size-4" aria-hidden />
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ishita Saha. Crafted with obsessive attention to game feel.
      </p>
    </footer>
  );
}