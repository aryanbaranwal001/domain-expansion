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
          className="text-sm font-main text-muted-foreground tracking-[0.4em] uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          // now
        </motion.h1>
        <p className="text-lg text-muted-foreground mb-20 max-w-2xl leading-relaxed">
          A live snapshot of what I'm currently building, researching, and experimenting with.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
          {/* Current Project */}
          <motion.div
            className="glow-border rounded-sm p-10 bg-card/40 md:col-span-2"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-5 h-5 text-primary" />
              <h2 className="text-xs font-main text-primary uppercase tracking-[0.2em] font-semibold">
                Current Build
              </h2>
              <motion.span
                className="ml-auto w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
              {currentProject.title}
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
              {currentProject.description}
            </p>
          </motion.div>

          {/* Current Focus — Progress Bars */}
          <motion.div
            className="glow-border rounded-sm p-8 bg-card/40"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="flex items-center gap-3 mb-8">
              <Activity className="w-5 h-5 text-secondary" />
              <h2 className="text-xs font-main text-secondary uppercase tracking-[0.2em] font-semibold">
                Current Focus
              </h2>
            </div>
            <div className="space-y-6">
              {focusAreas.map((area, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-medium">{area.label}</span>
                    <span className="text-xs font-main text-muted-foreground opacity-60">{area.progress}%</span>
                  </div>
                  <Progress value={area.progress} className="h-1.5 bg-muted" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Research */}
          <motion.div
            className="glow-border rounded-sm p-8 bg-card/40"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="flex items-center gap-3 mb-8">
              <FlaskConical className="w-5 h-5 text-secondary" />
              <h2 className="text-xs font-main text-secondary uppercase tracking-[0.2em] font-semibold">
                Current Research
              </h2>
            </div>
            <div className="space-y-4">
              {research.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0 shadow-[0_0_8px_hsl(var(--secondary))]"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                  <p className="text-base text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experiments — Floating Chips */}
          <motion.div
            className="glow-border rounded-sm p-8 bg-card/40 md:col-span-2"
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <div className="flex items-center gap-3 mb-8">
              <Wrench className="w-5 h-5 text-primary" />
              <h2 className="text-xs font-main text-primary uppercase tracking-[0.2em] font-semibold">
                Experiments & Explorations
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {experiments.map((exp, i) => (
                <motion.span
                  key={i}
                  className="text-sm font-main px-4 py-2 bg-muted/60 border border-border rounded-sm text-muted-foreground hover:bg-muted transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{
                    borderColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary))",
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
