import { useRef } from "react";
import { Shield, Brain, Cloud, Code2, Lock, Cpu, Database, Terminal } from "lucide-react";

const skills = [
  { icon: Shield, name: "Cyber Security", tags: ["Pen-testing", "OWASP", "Network Sec"], grad: "from-[var(--neon-pink)] to-[var(--neon-purple)]" },
  { icon: Brain, name: "GenAI / ML", tags: ["LLMs", "RAG", "Prompt Eng"], grad: "from-[var(--neon-purple)] to-[var(--neon-cyan)]" },
  { icon: Code2, name: "Full Stack", tags: ["React", "Node", "Python"], grad: "from-[var(--neon-green)] to-[var(--neon-cyan)]" },
  { icon: Cloud, name: "Cloud", tags: ["AWS", "Docker", "CI/CD"], grad: "from-[var(--neon-orange)] to-[var(--neon-pink)]" },
  { icon: Lock, name: "Cryptography", tags: ["AES", "RSA", "Hashing"], grad: "from-[var(--neon-pink)] to-[var(--neon-orange)]" },
  { icon: Cpu, name: "Systems", tags: ["Linux", "OS", "Networks"], grad: "from-[var(--neon-cyan)] to-[var(--neon-green)]" },
  { icon: Database, name: "Data", tags: ["SQL", "MongoDB", "Redis"], grad: "from-[var(--neon-green)] to-[var(--neon-orange)]" },
  { icon: Terminal, name: "DevTools", tags: ["Git", "Bash", "Vim"], grad: "from-[var(--neon-purple)] to-[var(--neon-pink)]" },
];

function SkillCard({ s }: { s: typeof skills[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.04)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale(1)";
  };

  const Icon = s.icon;
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="glass rounded-3xl p-6 transition-all duration-300 ease-out cursor-pointer relative overflow-hidden group"
    >
      <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${s.grad} opacity-20 blur-2xl group-hover:opacity-50 transition-opacity`} />
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center mb-4 shadow-lg`}>
        <Icon className="w-6 h-6 text-background" />
      </div>
      <h3 className="font-bold text-lg mb-3">{s.name}</h3>
      <div className="flex flex-wrap gap-1.5">
        {s.tags.map((t) => (
          <span key={t} className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/5 text-muted-foreground">{t}</span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-accent tracking-widest">// 02 — STACK</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12">
          Skills that <span className="text-gradient-acid">slap</span>.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {skills.map((s) => <SkillCard key={s.name} s={s} />)}
        </div>
      </div>
    </section>
  );
}
