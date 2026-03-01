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
          className="text-sm font-main text-muted-foreground tracking-[0.4em] uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          // blog
        </motion.h1>
        <p className="text-lg text-muted-foreground mb-20 max-w-2xl leading-relaxed">
          Writing about systems engineering, distributed infrastructure, and the craft of building reliable software.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              className="glow-border rounded-sm p-8 bg-card/30 cursor-pointer group transition-all duration-300 flex flex-col justify-between h-full"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, borderColor: "hsl(var(--primary) / 0.3)" }}
              style={{
                transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)`,
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[10px] font-main uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm border font-semibold ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-4 leading-tight">
                  {post.title}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {post.description}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
                <span className="text-xs font-main text-muted-foreground opacity-70">
                  {post.date}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="text-xs font-main text-muted-foreground opacity-70">
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
