import { useEffect, useRef, useState } from "react";
import { GraduationCap, Code2, Award, Shield, Rocket, Sparkles } from "lucide-react";

const nodes = [
  {
    year: "2022",
    title: "B.Tech CSE — Started",
    desc: "Began Computer Science journey. First lines of Python, first all-nighter, first 'it works on my machine'.",
    icon: GraduationCap,
    grad: "from-[var(--neon-purple)] to-[var(--neon-pink)]",
    tag: "EDUCATION",
  },
  {
    year: "2023",
    title: "Deep Dive: ML & Cloud",
    desc: "Coursera ML Specialization. Built first neural nets. Got hands dirty with AWS and containerization.",
    icon: Code2,
    grad: "from-[var(--neon-cyan)] to-[var(--neon-purple)]",
    tag: "SKILLS",
  },
  {
    year: "2024",
    title: "Certifications Unlocked",
    desc: "GitHub Foundations · AWS Cloud Practitioner · GenAI with LLMs · Google Cybersecurity. Stack stacked.",
    icon: Award,
    grad: "from-[var(--neon-orange)] to-[var(--neon-pink)]",
    tag: "MILESTONE",
  },
  {
    year: "2024",
    title: "Cyber Security Focus",
    desc: "Ethical Hacking Essentials. CTFs, pentesting labs, threat modeling. Red team mindset activated.",
    icon: Shield,
    grad: "from-[var(--neon-green)] to-[var(--neon-cyan)]",
    tag: "FOCUS SHIFT",
  },
  {
    year: "2025",
    title: "GenAI × Security",
    desc: "Building AI-powered security tooling. Where LLMs meet threat intel. The intersection nobody's mastered yet.",
    icon: Sparkles,
    grad: "from-[var(--neon-pink)] to-[var(--neon-orange)]",
    tag: "NOW",
  },
  {
    year: "2026+",
    title: "Cyber Security Engineer",
    desc: "Full-time defender. Building intelligent systems that keep the internet safer. The mission continues.",
    icon: Rocket,
    grad: "from-[var(--neon-purple)] to-[var(--neon-cyan)]",
    tag: "GOAL",
  },
];

export function Timeline() {
  const [active, setActive] = useState<number[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx"));
          if (entry.isIntersecting) {
            setActive((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });
      },
      { threshold: 0.4 },
    );
    refs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--neon-cyan)] opacity-15 blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-[var(--neon-pink)] opacity-15 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-accent tracking-widest">// 05 — THE PATH</span>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          The <span className="text-gradient-hero">journey</span>.
        </h2>
        <p className="text-lg text-muted-foreground mb-20 max-w-2xl">
          From first commit to cyber defender. The progress path, one node at a time.
        </p>

        <div className="relative">
          {/* Animated gradient spine */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px]">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--neon-pink)] via-[var(--neon-purple)] to-[var(--neon-cyan)] opacity-30" />
            <div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-[var(--neon-pink)] via-[var(--neon-purple)] to-[var(--neon-cyan)] transition-all duration-700 ease-out"
              style={{ height: `${(active.length / nodes.length) * 100}%`, boxShadow: "0 0 20px var(--neon-pink)" }}
            />
          </div>

          <div className="space-y-16">
            {nodes.map((n, i) => {
              const Icon = n.icon;
              const isActive = active.includes(i);
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  data-idx={i}
                  ref={(el) => { refs.current[i] = el; }}
                  className={`relative flex items-center gap-6 md:gap-12 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } transition-all duration-700 ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                >
                  {/* Node dot */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div
                      className={`w-5 h-5 rounded-full bg-gradient-to-br ${n.grad} ${
                        isActive ? "animate-pulse-glow" : ""
                      }`}
                    />
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${n.grad} blur-md opacity-60`} />
                  </div>

                  {/* Spacer for desktop alternating layout */}
                  <div className="hidden md:block flex-1" />

                  {/* Card */}
                  <div className={`flex-1 ml-20 md:ml-0 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="group relative glass rounded-3xl p-6 hover:-translate-y-1 transition-all duration-500 cursor-pointer">
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${n.grad} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:from-[var(--neon-pink)]/20 group-hover:to-[var(--neon-cyan)]/20 transition-all duration-500 -z-10 blur-md" />

                      <div className="relative">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${n.grad} flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                            <Icon className="w-5 h-5 text-background" />
                          </div>
                          <div>
                            <div className="font-mono text-[10px] uppercase tracking-widest text-accent">{n.tag}</div>
                            <div className="font-mono text-sm font-bold text-gradient-hero">{n.year}</div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-gradient-hero transition-all">{n.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{n.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
