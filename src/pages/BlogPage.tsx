import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const posts = [
  {
    title: "Why I'm Building a Blockchain Indexer in Rust",
    description: "The case for performance-first infrastructure and why existing solutions fall short.",
    date: "2025-02-15",
    readTime: "6 min",
    category: "Infra",
  },
  {
    title: "gRPC vs REST for High-Throughput Data Ingestion",
    description: "Lessons from building ingestion pipelines that handle millions of events.",
    date: "2025-01-28",
    readTime: "8 min",
    category: "Systems",
  },
  {
    title: "Fault Tolerance Patterns I Actually Use",
    description: "Circuit breakers, retry budgets, and bulkheads in production systems.",
    date: "2025-01-10",
    readTime: "5 min",
    category: "Performance",
  },
  {
    title: "ClickHouse for Blockchain Analytics",
    description: "Column-oriented storage meets on-chain data. Performance benchmarks and schema design.",
    date: "2024-12-20",
    readTime: "7 min",
    category: "Blockchain",
  },
];

const categoryColors: Record<string, string> = {
  Systems: "text-primary border-primary/30 bg-primary/5",
  Infra: "text-secondary border-secondary/30 bg-secondary/5",
  Blockchain: "text-primary border-primary/30 bg-primary/5",
  Performance: "text-secondary border-secondary/30 bg-secondary/5",
};

const BlogPage = () => {
  return (
    <div className="min-h-screen pt-14 relative z-10">
      <section className="container mx-auto px-6 pt-20 pb-16">
        <motion.h1
          className="text-xs font-main text-muted-foreground tracking-widest uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          // blog
        </motion.h1>
        <p className="text-sm text-muted-foreground mb-16 max-w-lg">
          Writing about systems engineering, distributed infrastructure, and the craft of building reliable software.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              className="glow-border rounded-sm p-5 bg-card/30 cursor-pointer group transition-all duration-300 flex flex-col justify-between"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              style={{
                transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)`,
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[9px] font-main uppercase tracking-widest px-2 py-0.5 rounded-sm border ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                </div>
                <h2 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/50">
                <span className="text-[10px] font-main text-muted-foreground">
                  {post.date}
                </span>
                <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
                <span className="text-[10px] font-main text-muted-foreground">
                  {post.readTime}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
