import { motion } from "framer-motion";
import {
  SiRust,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiClickhouse,
  SiDocker,
  SiNeovim,
} from "react-icons/si";

const techStack = [
  { name: "Rust", icon: SiRust },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "ClickHouse", icon: SiClickhouse },
  { name: "Docker", icon: SiDocker },
  { name: "gRPC", icon: null },
  { name: "Neovim", icon: SiNeovim },
];

const TechStrip = () => {
  const doubled = [...techStack, ...techStack, ...techStack];

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="relative max-w-5xl mx-auto border-y border-border/50 py-10 overflow-hidden group">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

        <div className="flex animate-scroll-left whitespace-nowrap items-center">
          {doubled.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-4 mx-10 group/item transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                {tech.icon ? (
                  <tech.icon className="w-6 h-6 text-muted-foreground/60 group-hover/item:text-primary transition-all duration-300 relative z-10" />
                ) : (
                  <span className="w-6 h-6 flex items-center justify-center text-[10px] font-mono font-bold text-muted-foreground/60 group-hover/item:text-primary relative z-10">
                    gRPC
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono text-muted-foreground/50 tracking-[0.2em] uppercase group-hover/item:text-foreground group-hover/item:tracking-[0.3em] transition-all duration-500">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStrip;
