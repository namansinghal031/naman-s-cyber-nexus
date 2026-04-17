import { Award, Github, Cloud, Brain, Shield, Star, Trophy, Zap } from "lucide-react";

const certs = [
  { icon: Github, name: "GitHub Foundations", org: "GitHub", year: "2024", grad: "from-[var(--neon-purple)] to-[var(--neon-pink)]" },
  { icon: Cloud, name: "AWS Cloud Practitioner", org: "Amazon", year: "2024", grad: "from-[var(--neon-orange)] to-[var(--neon-pink)]" },
  { icon: Brain, name: "GenAI with LLMs", org: "DeepLearning.AI", year: "2024", grad: "from-[var(--neon-cyan)] to-[var(--neon-purple)]" },
  { icon: Shield, name: "Ethical Hacking Essentials", org: "EC-Council", year: "2024", grad: "from-[var(--neon-pink)] to-[var(--neon-orange)]" },
  { icon: Award, name: "ML Specialization", org: "Coursera", year: "2023", grad: "from-[var(--neon-green)] to-[var(--neon-cyan)]" },
  { icon: Star, name: "Google Cybersecurity", org: "Google", year: "2024", grad: "from-[var(--neon-purple)] to-[var(--neon-cyan)]" },
];

const milestones = [
  { stat: "8+", label: "Certifications earned", icon: Award },
  { stat: "TOP 5%", label: "HackerRank Problem Solving", icon: Trophy },
  { stat: "3x", label: "Hackathon finalist", icon: Zap },
  { stat: "500+", label: "GitHub contributions", icon: Github },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-holo opacity-20 blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-accent tracking-widest">// 04 — TROPHY ROOM</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          The <span className="text-gradient-hero">trophy</span> room.
        </h2>
        <p className="text-lg text-muted-foreground mb-14 max-w-2xl">
          Receipts. Certifications, milestones, and W's collected on the journey.
        </p>

        {/* Milestones strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {milestones.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="glass-strong rounded-2xl p-5 relative overflow-hidden group hover:scale-[1.03] transition-transform">
                <Icon className="absolute top-3 right-3 w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                <div className="text-4xl font-black text-gradient-hero">{m.stat}</div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">{m.label}</div>
              </div>
            );
          })}
        </div>

        {/* Cert wall */}
        <div className="grid md:grid-cols-3 gap-5">
          {certs.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.name}
                className="group relative rounded-3xl p-6 glass overflow-hidden hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Holographic shine */}
                <div className={`absolute inset-0 bg-gradient-to-br ${c.grad} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className="absolute -inset-1 bg-gradient-holo opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700" />

                {/* Badge */}
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.grad} flex items-center justify-center mb-5 shadow-2xl group-hover:rotate-6 transition-transform duration-500 relative`}>
                    <div className="absolute inset-0 rounded-2xl animate-shine" />
                    <Icon className="w-7 h-7 text-background relative z-10" />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-1">CERTIFIED · {c.year}</div>
                  <h3 className="text-xl font-bold mb-1">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.org}</p>

                  {/* Verified ribbon */}
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    VERIFIED
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
