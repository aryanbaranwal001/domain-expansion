import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TechStrip from "@/components/TechStrip";
import Footer from "@/components/Footer";
import { Github, Twitter, Linkedin, Mail, ArrowRight, Terminal } from "lucide-react";

const currentWork = [
  {
    label: "Current Project",
    title: "Rust High-Throughput Blockchain Indexer",
    description:
      "A performance-focused indexing system for mission-critical blockchain data ingestion. Built with Rust and a gRPC ingestion pipeline, optimized for high-throughput and sub-second latency.",
    tags: ["Rust", "gRPC", "PostgreSQL", "ClickHouse"],
    accent: "primary" as const,
  },
  {
    label: "Current Learning",
    title: "Distributed Systems Literature",
    description:
      "Deep-diving into consensus algorithms, fault-tolerant replication, and the theory behind systems that don't break under pressure.",
    tags: ["Papers", "System Design", "Consensus"],
    accent: "secondary" as const,
  },
  {
    label: "Current Focus",
    title: "Scaling & Reliability",
    description:
      "Scaling ingestion throughput, building fault-tolerant pipelines, and reducing indexing latency to compete with existing market infrastructure.",
    tags: ["Performance", "Fault Tolerance", "Latency"],
    accent: "primary" as const,
  },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: "mailto:aryan@example.com" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen pt-14 relative z-10">
      {/* Hero */}
      <section className="container mx-auto px-6 pt-24 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          
<div className="max-w-3xl">
  <motion.div
    initial="hidden"
    animate="visible"
    custom={1}
    variants={fadeUp}
    className="mb-8"
  >
    {/* The Greeting */}
    <span className="text-muted-foreground font-light text-xl md:text-2xl block mb-2">
      Hi there, I'm
    </span>
    
    {/* The Name - Proudly Displayed */}
    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-none mb-4">
      Aryan Baranwal
    </h1>

    {/* The Handle Section */}
    <div className="flex items-baseline gap-3">
      <span className="text-lg italic font-serif text-muted-foreground/60">
        aka
      </span>
      <span className="text-2xl md:text-3xl font-mono font-medium text-foreground tracking-tight">
        0x_Mahoraga
      </span>
    </div>
  </motion.div>

  {/* Description */}
  <motion.p
    className="text-base text-muted-foreground leading-relaxed mb-4 max-w-xl"
    initial="hidden"
    animate="visible"
    custom={2}
    variants={fadeUp}
  >
    Building high-performance, scalable backend systems and 
    blockchain infrastructure that actually makes a difference.
  </motion.p>

  {/* Original Button Design */}
  <motion.div
    className="flex items-center gap-3"
    initial="hidden"
    animate="visible"
    custom={4}
    variants={fadeUp}
  >
    <Link
      to="/projects"
      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity"
    >
      View Projects <ArrowRight className="w-3 h-3" />
    </Link>
    <a
      href="#contact"
      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono border border-border text-muted-foreground rounded-sm hover:text-foreground hover:border-foreground/20 transition-colors"
    >
      Contact
    </a>
  </motion.div>
</div>


          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <img 
              src="/mahoraga.png" 
              alt="Aryan Baranwal" 
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-2 border-primary/20 p-1 bg-card/40 backdrop-blur-sm shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Tech Strip */}
      <TechStrip />

      {/* Currently Doing */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-12">
          // what i'm building
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {currentWork.map((item, i) => (
            <motion.div
              key={i}
              className="glow-border rounded-sm p-6 bg-card/40 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className={`w-8 h-0.5 mb-4 ${item.accent === "primary" ? "bg-primary" : "bg-secondary"}`} />
              <p className={`text-[10px] font-mono uppercase tracking-widest mb-3 ${item.accent === "primary" ? "text-primary" : "text-secondary"}`}>
                {item.label}
              </p>
              <h3 className="text-sm font-medium text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 bg-muted rounded-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-6 py-16">
        <div className="terminal-divider mb-16" />
        <h2 className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-8">
          // connect
        </h2>
        <div className="flex items-center gap-6 flex-wrap">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors duration-200"
              whileHover={{ x: 2 }}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </motion.a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
