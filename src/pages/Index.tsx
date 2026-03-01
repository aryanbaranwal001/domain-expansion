import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TechStrip from "@/components/TechStrip";
import Footer from "@/components/Footer";
import { ArrowRight, ChevronDown } from "lucide-react";

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

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const scrollToBuilding = () => {
    const element = document.getElementById("currently-building");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-16 relative z-10">
      {/* Hero Wrapper for Full Screen Height */}
      <div className="flex flex-col min-h-[calc(100vh-64px)]">
        {/* Hero */}
        <section className="container mx-auto px-6 pt-24">
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
                <span className="text-muted-foreground font-light text-2xl md:text-3xl block mb-2">
                  Hi there, I'm
                </span>
                
                {/* The Name - Proudly Displayed */}
                <h1 className="text-5xl md:text-7xl tracking-tighter text-primary leading-none mb-4">
                  Aryan Baranwal
                </h1>

                {/* The Handle Section */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-xl italic font-playfair text-muted-foreground/90">
                    aka
                  </span>
                  <span className="text-xl md:text-2xl font-main font-medium text-foreground tracking-tight">
                    0x_Mahoraga
                  </span>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Building high-performance, scalable backend systems and 
                  blockchain infrastructure that actually makes a difference.
                </p>
              </motion.div>

              {/* Original Button Design */}
              <motion.div
                className="flex items-center gap-4"
                initial="hidden"
                animate="visible"
                custom={3}
                variants={fadeUp}
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-main bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity"
                >
                  View Projects <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-main border border-border text-muted-foreground rounded-sm hover:text-foreground hover:border-foreground/20 transition-colors"
                >
                  Blogs
                </Link>
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
                className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover border-2 border-primary/60 p-1 bg-card/40 backdrop-blur-sm shadow-2xl"
              />
            </motion.div>
          </div>

          <TechStrip />
        
        </section>

        {/* Tech Strip */}

        {/* Scroll Indicator */}
        <div className="flex-grow flex flex-col items-center justify-center pb-8">
          <motion.button
            onClick={scrollToBuilding}
            className="flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-lg text-muted-foreground font-main opacity-70 group-hover:opacity-100 transition-opacity">
                What I'm locked into
              </span>
              <ChevronDown className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Currently Doing */}
      <section id="currently-building" className="container mx-auto px-6 py-32 scroll-mt-20">
        <h2 className="text-sm font-main font-semibold text-muted-foreground tracking-[0.4em] uppercase mb-16 opacity-80">
          // what i'm building
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {currentWork.map((item, i) => (
            <motion.div
              key={i}
              className="glow-border rounded-sm p-8 bg-card/40 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className={`w-12 h-0.5 mb-6 ${item.accent === "primary" ? "bg-primary" : "bg-secondary"}`} />
              <p className={`text-xs font-main font-semibold uppercase tracking-[0.25em] mb-4 ${item.accent === "primary" ? "text-primary" : "text-secondary"}`}>
                {item.label}
              </p>
              <h3 className="text-xl font-medium text-foreground mb-4">
                {item.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-main font-medium px-3 py-1 bg-muted rounded-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>

  );
};

export default Index;
