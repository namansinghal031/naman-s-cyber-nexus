import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Home, User, Code2, Trophy, Mail, Sparkles, Command } from "lucide-react";

const items = [
  { id: "home", label: "Home", icon: Home, href: "#home" },
  { id: "about", label: "About", icon: User, href: "#about" },
  { id: "skills", label: "Skills", icon: Sparkles, href: "#skills" },
  { id: "projects", label: "Projects", icon: Code2, href: "#projects" },
  { id: "achievements", label: "Wins", icon: Trophy, href: "#achievements" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

export function FloatingNav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(it.id);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top brand bar */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-3">
        <Link to="/" className="glass-strong px-4 py-2 rounded-2xl flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-sm tracking-tight">naman<span className="text-gradient-hero font-bold">.me</span></span>
        </Link>
        <button
          onClick={onOpenPalette}
          className="glass-strong px-3 py-2 rounded-2xl flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <Command className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">⌘K</span>
        </button>
      </div>

      {/* Floating dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <ul className="glass-strong rounded-full px-3 py-2.5 flex items-center gap-1 shadow-2xl">
          {items.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;
            return (
              <li key={it.id}>
                <a
                  href={it.href}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 group ${
                    isActive ? "bg-gradient-hero text-primary-foreground" : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className={`text-xs font-medium transition-all ${isActive ? "max-w-20 opacity-100" : "max-w-0 opacity-0 overflow-hidden md:max-w-20 md:opacity-100"}`}>
                    {it.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
