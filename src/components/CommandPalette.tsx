import { useEffect, useState } from "react";
import { Search, Home, User, Code2, Trophy, Mail, Sparkles, Github, Linkedin } from "lucide-react";

const commands = [
  { id: "home", label: "Go to Home", icon: Home, action: "#home" },
  { id: "about", label: "About Naman", icon: User, action: "#about" },
  { id: "skills", label: "View Skills", icon: Sparkles, action: "#skills" },
  { id: "projects", label: "Browse Projects", icon: Code2, action: "#projects" },
  { id: "achievements", label: "Trophy Room", icon: Trophy, action: "#achievements" },
  { id: "contact", label: "Get in Touch", icon: Mail, action: "#contact" },
  { id: "gh", label: "Open GitHub", icon: Github, action: "https://github.com" },
  { id: "li", label: "Open LinkedIn", icon: Linkedin, action: "https://linkedin.com" },
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      setQ("");
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  const run = (action: string) => {
    if (action.startsWith("#")) {
      document.querySelector(action)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(action, "_blank");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4 bg-background/70 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div className="glass-strong w-full max-w-xl rounded-3xl overflow-hidden border-gradient" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent outline-none text-sm font-mono placeholder:text-muted-foreground"
          />
          <kbd className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded bg-white/5">ESC</kbd>
        </div>
        <ul className="p-2 max-h-80 overflow-y-auto">
          {filtered.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.id}>
                <button
                  onClick={() => run(c.action)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gradient-hero hover:text-primary-foreground transition-all text-left text-sm group"
                >
                  <Icon className="w-4 h-4" />
                  <span>{c.label}</span>
                </button>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">No results. Try something else.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
