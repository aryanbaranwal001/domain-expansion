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
  { name: "Rust", icon: SiRust, color: "text-[#f74c00]" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178c6]" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#f7df1e]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169e1]" },
  { name: "ClickHouse", icon: SiClickhouse, color: "text-[#ffcc01]" },
  { name: "Docker", icon: SiDocker, color: "text-[#2496ed]" },
  { name: "Neovim", icon: SiNeovim, color: "text-[#57a143]" },
];

const TechMarquee = () => {
  const doubledStack = [...techStack, ...techStack];

  return (
    <section className="py-8 bg-transparent overflow-hidden border-y border-zinc-500/10">
      <div className="relative flex">
        {/* Neutral Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {doubledStack.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-8 py-3 mx-4 rounded-lg bg-transparent border border-zinc-500/30 cursor-default"
            >
              <div className={`text-2xl ${tech.color}`}>
                {tech.icon ? (
                  <tech.icon />
                ) : (
                  <span className="text-[12px] font-bold font-mono">gRPC</span>
                )}
              </div>
              
              <span className="text-[12px] font-mono font-bold uppercase tracking-[0.15em] text-foreground">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechMarquee;