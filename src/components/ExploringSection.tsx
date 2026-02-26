const ExploringSection = () => {
  const topics = [
    "Consensus algorithms & BFT protocols",
    "High-throughput data pipelines",
    "Blockchain state management",
    "Systems programming in Rust",
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-sm text-primary mb-2">// exploring</h2>
        <h3 className="text-3xl font-bold mb-4">Currently Learning</h3>
        <p className="text-sm text-muted-foreground mb-8 max-w-lg">
          Focused on building and learning rather than offering services. Here's what's on my radar.
        </p>

        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => (
            <span
              key={topic}
              className="text-sm px-4 py-2 rounded-full border border-border text-secondary-foreground cursed-glow transition-all duration-300"
            >
              {topic}
            </span>
          ))}
        </div>

        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default ExploringSection;
