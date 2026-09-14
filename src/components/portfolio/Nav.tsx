import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, Gamepad2 } from "lucide-react";
import { SECTIONS } from "./data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 lg:grid-cols-[auto_1fr_auto]",
          scrolled ? "glass mx-4 shadow-[0_18px_50px_-30px_rgba(139,92,246,0.8)]" : "mx-4",
        )}
      >
        <a href="#home" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl glass glow-violet">
            <Gamepad2 className="size-4 text-neon-cyan" aria-hidden />
          </span>
          <span className="truncate font-display text-sm font-bold tracking-widest uppercase">
            Ishita<span className="text-neon-violet">.</span>
          </span>
        </a>

        <ul className="hidden items-center justify-center gap-1 lg:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  "relative inline-flex rounded-full px-3.5 py-2 font-alt text-sm transition-colors",
                  active === s.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active === s.id ? "true" : undefined}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-2">
          <a
            href="#contact"
            className="hidden min-h-11 items-center rounded-full px-5 font-alt text-sm font-semibold text-primary-foreground glow-violet sm:inline-flex"
            style={{ background: "var(--gradient-neon)" }}
          >
            Hire me
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-full glass lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-2 rounded-3xl glass p-3 lg:hidden"
          >
            <ul className="grid gap-1">
              {SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-2xl px-4 font-alt text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}