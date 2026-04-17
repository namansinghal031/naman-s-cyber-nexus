import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

const taglines = [
  "Building Intelligent Systems",
  "Breaking Limits",
  "Future Cyber Defender",
];

export function Hero() {
  const [text, setText] = useState("");
  const [tIdx, setTIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = taglines[tIdx];
    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), 1400);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setTIdx((i) => (i + 1) % taglines.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, tIdx]);

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden noise grid-bg">
      {/* Animated blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/40 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--neon-purple)]/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-[var(--neon-orange)]/30 blur-3xl animate-blob" style={{ animationDelay: "6s" }} />

      {/* Floating holo ring */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-holo opacity-40 blur-2xl animate-spin-slow hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8 animate-float">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-xs tracking-wider text-muted-foreground">
            <span className="text-accent">●</span> ONLINE · OPEN TO OPPORTUNITIES
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display font-black tracking-tighter leading-[0.9] mb-6">
          <span className="block text-7xl md:text-9xl text-gradient-hero animate-gradient">NAMAN</span>
          <span className="block text-7xl md:text-9xl relative">
            SINGHAL
            <span className="absolute inset-0 text-gradient-acid blur-xl opacity-40" aria-hidden>SINGHAL</span>
          </span>
        </h1>

        {/* Typing tagline */}
        <div className="font-mono text-sm md:text-lg mb-10 h-7 flex items-center justify-center gap-2 text-foreground/90">
          <Terminal className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">$</span>
          <span>{text}</span>
          <span className="inline-block w-2 h-5 bg-primary animate-pulse" />
        </div>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          CS student × aspiring <span className="text-foreground font-semibold">Cyber Security Engineer</span>.
          Currently obsessed with <span className="text-gradient-acid font-semibold">GenAI</span>, ethical hacking, and shipping cool stuff.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 bg-gradient-hero text-primary-foreground font-semibold px-7 py-3.5 rounded-full overflow-hidden hover-glitch animate-pulse-glow"
          >
            <span className="relative z-10">See my work</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 animate-shine" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 glass-strong px-7 py-3.5 rounded-full hover:border-white/20 transition-all"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Let's connect</span>
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground tracking-widest opacity-60">
          SCROLL ↓
        </div>
      </div>
    </section>
  );
}
