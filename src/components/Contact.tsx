import { useState } from "react";
import { Check, Loader2, Mail, Send } from "lucide-react";

export function Contact() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("done");
      setTimeout(() => setState("idle"), 2500);
    }, 1400);
  };

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/20 blur-3xl" />

      <div className="max-w-3xl mx-auto relative">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-accent tracking-widest">// 05 — LINK UP</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>

        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-center">
          Let's <span className="text-gradient-hero">build</span>.
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Got an idea, gig, or just wanna talk shop? My inbox is open.
        </p>

        <form onSubmit={submit} className="glass-strong rounded-3xl p-8 space-y-5 border-gradient">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="group">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Name</label>
              <input
                required
                placeholder="Your name"
                className="mt-1 w-full bg-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 placeholder:text-muted-foreground/60 transition-all border border-transparent focus:border-primary/30 focus:shadow-[0_0_20px_oklch(0.72_0.32_350/0.3)]"
              />
            </div>
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                required
                type="email"
                placeholder="you@domain.com"
                className="mt-1 w-full bg-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white/10 placeholder:text-muted-foreground/60 transition-all border border-transparent focus:border-accent/30 focus:shadow-[0_0_20px_oklch(0.82_0.28_145/0.3)]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea
              required
              rows={5}
              placeholder="Tell me what you're cooking up..."
              className="mt-1 w-full bg-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 placeholder:text-muted-foreground/60 transition-all border border-transparent focus:border-primary/30 focus:shadow-[0_0_20px_oklch(0.72_0.32_350/0.3)] resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <a href="mailto:hi@namansinghal.me" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
              hi@namansinghal.me
            </a>
            <button
              type="submit"
              disabled={state !== "idle"}
              className="relative inline-flex items-center gap-2 bg-gradient-hero text-primary-foreground font-semibold px-7 py-3 rounded-full overflow-hidden disabled:opacity-90 min-w-44 justify-center group"
            >
              {state === "idle" && (
                <>
                  <span>Send message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
              {state === "loading" && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              )}
              {state === "done" && (
                <>
                  <Check className="w-4 h-4" />
                  <span>Sent!</span>
                </>
              )}
              <span className="absolute inset-0 animate-shine pointer-events-none" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5 mt-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="text-gradient-hero font-bold">naman.me</span> · built with caffeine + chaos
        </div>
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {["GitHub", "LinkedIn", "X", "Email"].map((s) => (
            <a key={s} href="#" className="hover:text-foreground transition-colors hover-glitch">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
