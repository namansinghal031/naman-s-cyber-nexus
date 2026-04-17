import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          setN(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{n}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-accent tracking-widest">// 01 — WHO</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
              About <span className="text-gradient-hero">me</span>.
            </h2>
            <div className="space-y-5 text-lg text-foreground/85 leading-relaxed">
              <p>
                Hey, I'm <span className="font-semibold text-foreground">Naman</span> — a Computer Science student wired for
                <span className="text-gradient-acid font-semibold"> systems that think</span> and
                <span className="text-primary font-semibold"> systems that defend</span>.
              </p>
              <p>
                Currently exploring <span className="font-mono px-2 py-0.5 rounded bg-accent/10 text-accent">GenAI</span> +
                <span className="font-mono px-2 py-0.5 rounded bg-primary/10 text-primary ml-1">Cyber Security</span> 🚀
                Spending late nights learning red team tactics, fine-tuning models, and building things people actually want to use.
              </p>
              <p className="text-muted-foreground">
                I believe the next decade belongs to engineers who can build with AI and break it before the bad guys do.
                I'm training for both sides of that game.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {[
              { n: 12, s: "+", label: "Projects shipped", grad: "from-[var(--neon-pink)] to-[var(--neon-purple)]" },
              { n: 30, s: "+", label: "Tech stack", grad: "from-[var(--neon-green)] to-[var(--neon-cyan)]" },
              { n: 365, s: "🔥", label: "Day learning streak", grad: "from-[var(--neon-orange)] to-[var(--neon-pink)]" },
              { n: 8, s: "", label: "Certifications", grad: "from-[var(--neon-purple)] to-[var(--neon-cyan)]" },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-5 hover:scale-105 transition-transform group">
                <div className={`text-4xl font-black bg-gradient-to-br ${s.grad} bg-clip-text text-transparent group-hover:scale-110 inline-block transition-transform`}>
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
