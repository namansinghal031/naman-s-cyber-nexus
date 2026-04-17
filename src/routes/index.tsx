import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FloatingNav } from "@/components/FloatingNav";
import { CommandPalette } from "@/components/CommandPalette";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Timeline } from "@/components/Timeline";
import { Contact, Footer } from "@/components/Contact";
import { AIChat } from "@/components/AIChat";
import { CustomCursor } from "@/components/CustomCursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naman Singhal — CS Student × Cyber Security Engineer" },
      { name: "description", content: "Personal portfolio of Naman Singhal — Computer Science student, aspiring Cyber Security Engineer, building with GenAI." },
      { property: "og:title", content: "Naman Singhal — Building Intelligent Systems × Future Cyber Defender" },
      { property: "og:description", content: "Portfolio, projects, certifications, and an AI sidekick that talks about Naman." },
    ],
  }),
  component: Index,
});

function Index() {
  const [palette, setPalette] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="relative">
      <FloatingNav onOpenPalette={() => setPalette(true)} />
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Timeline />
      <Contact />
      <Footer />
      <AIChat />
      <CustomCursor />
    </main>
  );
}
