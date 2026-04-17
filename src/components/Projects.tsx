import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    title: "NeuralVault",
    desc: "GenAI-powered personal knowledge vault with RAG, semantic search, and a chat interface trained on your own notes.",
    tags: ["GenAI", "RAG", "Next.js", "Vector DB"],
    grad: "from-[var(--neon-pink)] via-[var(--neon-purple)] to-[var(--neon-cyan)]",
    accent: "var(--neon-pink)",
  },
  {
    title: "PhishGuard",
    desc: "Real-time phishing URL detector using ML + heuristic analysis. Browser extension that warns before you click.",
    tags: ["Security", "ML", "Python", "Browser Ext"],
    grad: "from-[var(--neon-orange)] via-[var(--neon-pink)] to-[var(--neon-purple)]",
    accent: "var(--neon-orange)",
  },
  {
    title: "PortScanX",
    desc: "Async network scanner with banner grabbing and vulnerability fingerprinting. Built for speed and stealth.",
    tags: ["Security", "Networking", "Python", "Async"],
    grad: "from-[var(--neon-green)] via-[var(--neon-cyan)] to-[var(--neon-purple)]",
    accent: "var(--neon-green)",
  },
  {
    title: "CodeMate AI",
    desc: "AI pair-programmer in your terminal. Reviews diffs, explains stack traces, suggests refactors — fully local.",
    tags: ["AI", "CLI", "TypeScript", "LLM"],
    grad: "from-[var(--neon-cyan)] via-[var(--neon-green)] to-[var(--neon-orange)]",
    accent: "var(--neon-cyan)",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-accent tracking-widest">// 03 — BUILDS</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12">
          Stuff I've <span className="text-gradient-hero">shipped</span>.
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative glass rounded-3xl p-7 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{ ["--accent" as never]: p.accent }}
            >
              {/* Gradient orb */}
              <div className={`absolute -bottom-32 -right-32 w-72 h-72 rounded-full bg-gradient-to-br ${p.grad} opacity-20 blur-3xl group-hover:opacity-60 transition-all duration-700`} />

              {/* Top row */}
              <div className="flex items-start justify-between mb-6 relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.grad} flex items-center justify-center font-black text-2xl text-background shadow-xl`}>
                  {p.title.charAt(0)}
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                    <Github className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-3xl font-black mb-3 relative">{p.title}</h3>
              <p className="text-muted-foreground mb-5 leading-relaxed relative">{p.desc}</p>

              <div className="flex flex-wrap gap-2 relative">
                {p.tags.map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-foreground/80 group-hover:border-white/20 transition-colors">
                    #{t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
