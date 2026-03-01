import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowLeft, ArrowRight, Network, Database, Server } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    name: "Rust High-Throughput Blockchain Indexer",
    description:
      "A performance-focused indexing system designed for mission-critical blockchain data ingestion. Built using Rust with a gRPC ingestion pipeline, optimized for high-throughput and low-latency indexing. Designed to compete with existing market infrastructure.",
    tech: ["Rust", "gRPC", "PostgreSQL", "ClickHouse", "Docker"],
    github: "https://github.com",
    status: "Active",
    icon: Network,
    metrics: ["~100K events/sec", "<50ms p99 latency", "99.99% uptime target"],
  },
  {
    name: "Distributed Task Scheduler",
    description:
      "A fault-tolerant distributed task scheduling system with priority queues, retry mechanisms, and real-time monitoring. Handles millions of tasks across distributed worker nodes.",
    tech: ["Rust", "PostgreSQL", "gRPC", "Docker"],
    github: "https://github.com",
    status: "In Progress",
    icon: Server,
    metrics: ["10M+ tasks/day", "Exactly-once semantics", "Auto-scaling workers"],
  },
  {
    name: "Event-Driven Data Pipeline",
    description:
      "High-throughput event streaming pipeline for real-time data processing. Supports backpressure handling and exactly-once delivery semantics.",
    tech: ["TypeScript", "PostgreSQL", "Docker", "ClickHouse"],
    github: "https://github.com",
    status: "Completed",
    icon: Database,
    metrics: ["Stream processing", "Backpressure control", "At-least-once delivery"],
  },
];

const ProjectsPage = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % projects.length);
  };
  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + projects.length) % projects.length);
  };

  const project = projects[current];
  const Icon = project.icon;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="min-h-screen pt-14 relative z-10">
      <section className="container mx-auto px-6 pt-20 pb-16">
        <motion.h1
          className="text-xs font-main text-muted-foreground tracking-widest uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          // projects
        </motion.h1>
        <p className="text-sm text-muted-foreground mb-16 max-w-lg">
          Systems I've designed and built. Each one solves a real infrastructure problem.
        </p>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="glow-border rounded-sm bg-card/40 overflow-hidden"
            >
              <div className="grid md:grid-cols-[1fr_1.5fr]">
                {/* Left — System Visual */}
                <div className="p-8 border-r border-border flex flex-col items-center justify-center bg-muted/20 relative overflow-hidden">
                  {/* Abstract grid */}
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-sm border border-border bg-card/60 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-[10px] font-main text-primary uppercase tracking-widest">
                      {project.status}
                    </span>
                    {/* Metrics */}
                    <div className="mt-4 space-y-2">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-secondary" />
                          <span className="text-[10px] font-main text-muted-foreground">{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — Info */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-main text-muted-foreground">
                        {current + 1} / {projects.length}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground mb-4">
                      {project.name}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-main px-2.5 py-1 bg-muted rounded-sm text-muted-foreground border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-main text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <span className="text-primary">$</span>
                    <span className="group-hover:underline">view-source</span>
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-8 h-0.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
