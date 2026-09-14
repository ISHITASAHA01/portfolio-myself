import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Copy, Github, Instagram, Linkedin, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { MagneticButton, Reveal, SectionHeading } from "./primitives";

const EMAIL = "ishitasaha975@gmail.com";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell me a bit more (10+ characters)").max(1000),
});

const LINKS = [
  { Icon: Mail, label: "Email", value: EMAIL, href: `mailto:ishitasaha975@gmail.com` },
  // { Icon: Phone, label: "Phone", value: "+91 96797 08493", href: "tel:+9196797" },
  { Icon: Linkedin, label: "LinkedIn", value: "/in/ishitasaha", href: "https://www.linkedin.com/in/ishita-saha-36398a263" },
  { Icon: Github, label: "GitHub", value: "@ishitasaha", href: "https://github.com/ISHITASAHA01" },
  // { Icon: MessageCircle, label: "Discord", value: "ishita#4210", href: "https://discord.com" },
  { Icon: Instagram, label: "Instagram", value: "@ishita.builds", href: "https://instagram.com/ishitasaha2002" },
];

export function Contact() {
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    const target = e.currentTarget;
    setTimeout(() => {
      setSending(false);
      target.reset();
      toast.success("Message sent — I'll reply within 24 hours.");
    }, 1100);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const field =
    "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon-cyan/60 focus:outline-none";

  return (
    <section id="contact" className="relative px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's create engaging gaming experiences together "
          description="Open to Frontend Game Developer opportunities, HTML5 game projects, and collaborations."
        />

        {/* <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"> */}
        <div className="max-w-3xl mx-auto">
          {/* <Reveal> */}
          {/* <form onSubmit={onSubmit} noValidate className="rounded-3xl glass gradient-border p-6 sm:p-8"> */}
          {/* <div className="grid gap-4 sm:grid-cols-2"> */}
          <div>
            {/* <label htmlFor="name" className="mb-2 block font-alt text-sm">
                    Name
                  </label> */}
            {/* <input id="name" name="name" className={field} placeholder="Your name" />
                  {errors["name"] && (
                    <p className="mt-1.5 text-xs text-destructive">{errors["name"]}</p>
                  )} */}
            {/* </div>
                <div> */}
            {/* <label htmlFor="email" className="mb-2 block font-alt text-sm">
                    Email
                  </label> */}
            {/* <input id="email" name="email" type="email" className={field} placeholder="you@studio.com" />
                  {errors["email"] && (
                    <p className="mt-1.5 text-xs text-destructive">{errors["email"]}</p>
                  )} */}
          </div>
          {/* </div> */}
          {/* <div className="mt-4">
                <label htmlFor="message" className="mb-2 block font-alt text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className={field}
                  placeholder="Tell me about the project, team and timeline."
                />
                {errors["message"] && (
                  <p className="mt-1.5 text-xs text-destructive">{errors["message"]}</p>
                )}
              </div> */}
          {/* <div className="mt-6 flex flex-wrap gap-3">
                <MagneticButton type="submit" disabled={sending}>
                  <Send className={`size-4 ${sending ? "animate-pulse" : ""}`} aria-hidden />
                  {sending ? "Sending…" : "Send message"}
                </MagneticButton>
                <MagneticButton type="button" variant="ghost" onClick={copyEmail}>
                  {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                  Copy email
                </MagneticButton>
              </div> */}
          {/* </form> */}
          {/* </Reveal> */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {LINKS.map((l, i) => (
              <Reveal key={l.label} delay={0.05 * i}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 rounded-2xl glass gradient-border p-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5 text-neon-cyan transition-colors group-hover:text-neon-rose">
                    <l.Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-alt text-xs tracking-widest text-muted-foreground uppercase">
                      {l.label}
                    </span>
                    <span className="block truncate text-sm">{l.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section >
  );
}