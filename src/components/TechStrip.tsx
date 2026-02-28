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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

const TechCapsule = ({ tech, index }: { tech: typeof techStack[0]; index: number }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <motion.div
        className="inline-flex flex-col items-center gap-2 mx-4 px-5 py-3 rounded-sm border border-border bg-card/30 cursor-default shrink-0"
        whileHover={{
          y: -4,
          borderColor: "hsl(32, 100%, 55%)",
          boxShadow: "0 0 20px -5px hsla(32, 100%, 55%, 0.2)",
        }}
        transition={{ duration: 0.2 }}
      >
        {tech.icon ? (
          <tech.icon className="w-5 h-5 text-muted-foreground" />
        ) : (
          <span className="w-5 h-5 flex items-center justify-center text-[10px] font-mono font-bold text-muted-foreground">
            gR
          </span>
        )}
        <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
          {tech.name}
        </span>
      </motion.div>
    </TooltipTrigger>
    <TooltipContent side="bottom" className="text-xs font-mono">
      {tech.name}
    </TooltipContent>
  </Tooltip>
);

const TechStrip = () => {
  const doubled = [...techStack, ...techStack];

  return (
    <div className="overflow-hidden py-8 border-y border-border relative">
      <div className="flex animate-scroll-left whitespace-nowrap">
        {doubled.map((tech, i) => (
          <TechCapsule key={i} tech={tech} index={i} />
        ))}
      </div>
    </div>
  );
};

export default TechStrip;
