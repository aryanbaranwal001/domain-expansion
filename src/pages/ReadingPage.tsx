import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BookOpen, FileText, Globe } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    label: "Papers",
    icon: FileText,
    items: [
      {
        title: "Raft: In Search of an Understandable Consensus Algorithm",
        meta: "Ongaro & Ousterhout, 2014",
        insight: "The most accessible consensus algorithm paper. Made Paxos understandable and practical for real-world distributed systems.",
        type: "Paper",
      },
      {
        title: "Dynamo: Amazon's Highly Available Key-value Store",
        meta: "DeCandia et al., 2007",
        insight: "Introduced consistent hashing, vector clocks, and sloppy quorum — foundational techniques for eventually consistent systems.",
        type: "Paper",
      },
      {
        title: "The Google File System",
        meta: "Ghemawat et al., 2003",
        insight: "Showed how to build reliable storage on unreliable commodity hardware. The origin story of HDFS.",
        type: "Paper",
      },
    ],
  },
  {
    label: "Books",
    icon: BookOpen,
    items: [
      {
        title: "Designing Data-Intensive Applications",
        meta: "Martin Kleppmann",
        insight: "The definitive guide to data systems. Covers replication, partitioning, transactions, and stream processing with unmatched clarity.",
        type: "Book",
      },
      {
        title: "Systems Performance",
        meta: "Brendan Gregg",
        insight: "A masterclass in performance analysis methodology. Essential for anyone debugging latency or throughput issues.",
        type: "Book",
      },
      {
        title: "Database Internals",
        meta: "Alex Petrov",
        insight: "Deep dive into B-Trees, LSM-Trees, and distributed database architecture. Great companion to DDIA.",
        type: "Book",
      },
    ],
  },
  {
    label: "Blogs & Specs",
    icon: Globe,
    items: [
      {
        title: "How FoundationDB Works and Why",
        meta: "FoundationDB Engineering",
        insight: "Deterministic simulation testing explained. How to test distributed systems with mathematical confidence.",
        type: "Article",
      },
      {
        title: "CockroachDB Architecture Overview",
        meta: "CockroachDB Docs",
        insight: "Excellent walkthrough of range-based sharding and how to build a geo-distributed SQL database.",
        type: "Spec",
      },
      {
        title: "gRPC Core Concepts",
        meta: "grpc.io",
        insight: "The specification behind modern RPC. Understanding HTTP/2 framing and protobuf serialization.",
        type: "Spec",
      },
    ],
  },
];

const ReadingCard = ({ item, index }: { item: typeof categories[0]["items"][0]; index: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="relative h-56 cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden glow-border secondary-glow rounded-sm p-6 bg-card/40 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-main text-secondary uppercase tracking-[0.2em] px-2.5 py-1 bg-secondary/10 rounded-sm border border-secondary/20 font-semibold">
              {item.type}
            </span>
            <h3 className="text-base font-semibold text-foreground mt-4 leading-snug">
              {item.title}
            </h3>
          </div>
          <p className="text-xs font-main text-muted-foreground opacity-70 italic">{item.meta}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden glow-border rounded-sm p-6 bg-card/60 flex flex-col justify-center border-secondary/30"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-xs font-main text-secondary uppercase tracking-[0.2em] mb-4 font-semibold">
            Key Takeaway
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.insight}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ReadingPage = () => {
  return (
    <div className="min-h-screen pt-14 relative z-10">
      <section className="container mx-auto px-6 pt-20 pb-16">
        <motion.h1
          className="text-sm font-main text-muted-foreground tracking-[0.4em] uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          // reading
        </motion.h1>
        <p className="text-lg text-muted-foreground mb-20 max-w-2xl leading-relaxed">
          Papers, books, and technical writing that shape how I think about systems. Hover to reveal insights.
        </p>

        <div className="space-y-20 max-w-5xl">
          {categories.map((cat, i) => {
            const CatIcon = cat.icon;
            return (
              <div key={i}>
                <div className="flex items-center gap-3 mb-10">
                  <CatIcon className="w-5 h-5 text-secondary" />
                  <h2 className="text-xs font-main text-secondary uppercase tracking-[0.2em] font-semibold">
                    {cat.label}
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.items.map((item, j) => (
                    <ReadingCard key={j} item={item} index={j + i * 3} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReadingPage;
