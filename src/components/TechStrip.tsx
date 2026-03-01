import { motion } from "framer-motion";
import {
  SiRust,
  SiTypescript,
  SiPostgresql,
  SiClickhouse,
  SiDocker,
  SiNeovim,
} from "react-icons/si";

const techStack = [
  { name: "Rust", icon: SiRust, color: "text-[#f74c00]" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178c6]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169e1]" },
  { name: "ClickHouse", icon: SiClickhouse, color: "text-[#ffcc01]" },
  { name: "Docker", icon: SiDocker, color: "text-[#2496ed]" },
  { name: "Neovim", icon: SiNeovim, color: "text-[#57a143]" },
];

const TechMarquee = () => {
  const multiStack = [...techStack, ...techStack, ...techStack, ...techStack];

  return (
    <section className="py-8 bg-transparent mt-[6%]">
      <div className="mx-auto px-6">
        <div className="relative flex overflow-hidden -mx-12">
          {/* Neutral Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {multiStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-8 py-3 mx-4 rounded-full bg-background border border-secondary/40 cursor-default shadow-sm"
              >
                <div className={`text-2xl ${tech.color}`}>
                  {tech.icon ? (
                    <tech.icon />
                  ) : (
                    <span className="text-[12px] font-bold font-mono">No TechStack</span>
                  )}
                </div>
                
                <span className="text-[12px] font-mono font-bold uppercase tracking-[0.15em] text-foreground">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;