import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const responses: Record<string, string> = {
  who: "Naman is a CS student building intelligent systems and learning to defend them. Half engineer, half ethical hacker, full-time builder.",
  skills: "Stack: React/Next, Python, Node, AWS, Docker. Specializing in GenAI (RAG, LLMs) and Cyber Security (pen-testing, network sec).",
  projects: "Top builds: NeuralVault (RAG knowledge base), PhishGuard (ML phishing detector), PortScanX (async scanner), CodeMate AI (terminal pair-programmer).",
  contact: "Best ways to reach: the contact form below ↓ or socials in the footer. Replies usually within 24h.",
  ai: "Big yes. Currently exploring GenAI deeply — RAG pipelines, fine-tuning, agentic workflows. The future is AI-native.",
  cyber: "Studying offensive security: OWASP Top 10, network recon, web exploitation. Goal: become a Cyber Security Engineer who actually builds, not just audits.",
  hire: "Yes — open to internships, freelance, and collabs in GenAI / Security / Full-stack. Drop a message below 👇",
  default: "Try asking about Naman's skills, projects, certifications, AI interests, or how to hire him.",
};

function reply(q: string): string {
  const s = q.toLowerCase();
  if (/who|about|naman/.test(s)) return responses.who;
  if (/skill|stack|tech/.test(s)) return responses.skills;
  if (/project|build|work/.test(s)) return responses.projects;
  if (/contact|reach|email/.test(s)) return responses.contact;
  if (/ai|genai|ml|llm/.test(s)) return responses.ai;
  if (/cyber|security|hack/.test(s)) return responses.cyber;
  if (/hire|intern|job|available/.test(s)) return responses.hire;
  return responses.default;
}

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "yo 👋 I'm Naman's AI sidekick. Ask me anything about him — skills, projects, certs, vibe." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    const full = reply(q);
    setTimeout(() => {
      setTyping(false);
      // Animated typing effect
      let i = 0;
      const text = full;
      setMsgs((m) => [...m, { role: "bot", text: "" }]);
      const iv = setInterval(() => {
        i++;
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "bot", text: text.slice(0, i) };
          return copy;
        });
        if (i >= text.length) clearInterval(iv);
      }, 18);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 right-6 z-50 group"
        aria-label="Open AI chat"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-hero blur-xl opacity-70 group-hover:opacity-100 transition" />
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-hero text-primary-foreground shadow-2xl animate-pulse-glow">
          {open ? <X className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
        </span>
      </button>

      {open && (
        <div className="fixed bottom-44 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm glass-strong rounded-3xl overflow-hidden border-gradient flex flex-col animate-in slide-in-from-bottom-4 fade-in duration-300" style={{ height: "min(70vh, 520px)" }}>
          <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold">Ask about Naman</div>
              <div className="text-[10px] font-mono text-accent flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> AI · ONLINE
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm ${
                  m.role === "user"
                    ? "bg-gradient-hero text-primary-foreground rounded-br-sm"
                    : "glass rounded-bl-sm"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="glass px-3.5 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-white/5 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask anything..."
              className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
            />
            <button onClick={send} className="w-10 h-10 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
