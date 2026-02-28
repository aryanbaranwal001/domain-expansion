import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Activity, Cpu, FlaskConical, Wrench } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const currentProject = {
  title: "Rust High-Throughput Blockchain Indexer",
  status: "Active Development",
  description: "Building a gRPC-based ingestion pipeline with fault-tolerant recovery and sub-100ms analytical reads via ClickHouse.",
};

const focusAreas = [
  { label: "Ingestion Throughput", progress: 72 },
  { label: "Fault Recovery Pipeline", progress: 45 },
  { label: "Query Optimization", progress: 60 },
  { label: "Integration Tests", progress: 30 },
];

const experiments = [
  "Deterministic simulation testing (FoundationDB-style)",
  "Shard-per-core architecture patterns",
  "CRDTs for distributed state sync",
  "Nix flakes for hermetic builds",
  "Custom LSP extensions in Neovim",
  "Region-splitting in TiKV's Raft layer",
];

const research = [
  "Consensus in partially synchronous networks",
  "Formal verification of distributed protocols",
  "Column-oriented storage for on-chain data",
];

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4 },
  }),
};

const NowPage = () => {
  return (
    <div className="min-h-screen pt-14 relative z-10">
      <section className="container mx-auto px-6 pt-20 pb-16">
        <motion.h1
          className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          // now
        </motion.h1>
        <p className="text-sm text-muted-foreground mb-16 max-w-lg">
          A live snapshot of what I'm currently building, researching, and experimenting with.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* Current Project */}
          <motion.div
            className="glow-border rounded-sm p-6 bg-card/40 md:col-span-2"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-primary" />
              <h2 className="text-[10px] font-mono text-primary uppercase tracking-widest">
                Current Build
              </h2>
              <motion.span
                className="ml-auto w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <h3 className="text-base font-medium text-foreground mb-2">
              {currentProject.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentProject.description}
            </p>
          </motion.div>

          {/* Current Focus — Progress Bars */}
          <motion.div
            className="glow-border rounded-sm p-6 bg-card/40"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-4 h-4 text-secondary" />
              <h2 className="text-[10px] font-mono text-secondary uppercase tracking-widest">
                Current Focus
              </h2>
            </div>
            <div className="space-y-5">
              {focusAreas.map((area, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">{area.label}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{area.progress}%</span>
                  </div>
                  <Progress value={area.progress} className="h-1 bg-muted" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Research */}
          <motion.div
            className="glow-border rounded-sm p-6 bg-card/40"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="flex items-center gap-2 mb-6">
              <FlaskConical className="w-4 h-4 text-secondary" />
              <h2 className="text-[10px] font-mono text-secondary uppercase tracking-widest">
                Current Research
              </h2>
            </div>
            <div className="space-y-3">
              {research.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experiments — Floating Chips */}
          <motion.div
            className="glow-border rounded-sm p-6 bg-card/40 md:col-span-2"
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="flex items-center gap-2 mb-6">
              <Wrench className="w-4 h-4 text-primary" />
              <h2 className="text-[10px] font-mono text-primary uppercase tracking-widest">
                Experiments & Explorations
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {experiments.map((exp, i) => (
                <motion.span
                  key={i}
                  className="text-xs font-mono px-3 py-1.5 bg-muted/60 border border-border rounded-sm text-muted-foreground"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{
                    borderColor: "hsl(32, 100%, 55%)",
                    color: "hsl(60, 100%, 99%)",
                  }}
                >
                  {exp}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NowPage;
