import { ExternalLink } from "lucide-react";
import MahoragaWheel from "./MahoragaWheel";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-sm text-primary mb-2">// projects</h2>
        <h3 className="text-3xl font-bold mb-10">What I'm Building</h3>

        {/* Featured project */}
        <div className="relative p-8 rounded-xl border border-border gradient-card cursed-glow overflow-hidden">
          {/* Background wheel */}
          <div className="absolute -right-20 -bottom-20 opacity-30 pointer-events-none">
            <MahoragaWheel size={250} className="mahoraga-wheel-fast" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-primary/10 text-primary border border-primary/20">
                rust
              </span>
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-secondary text-muted-foreground">
                in development
              </span>
            </div>

            <h4 className="text-xl font-bold mb-3">Rust-based Blockchain Indexer</h4>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-6">
              A high-performance blockchain indexer being built in Rust, focused on efficient data
              extraction, transformation, and querying from decentralized systems. Emphasizing
              systems thinking, performance-first design, and infrastructure-level engineering.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {["Rust", "PostgreSQL", "gRPC", "Tokio", "Event Sourcing"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-muted-foreground px-2.5 py-1 rounded border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="font-mono text-xs text-primary/50 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse" />
              Currently under development
            </p>
          </div>
        </div>

        {/* More projects placeholder */}
        <div className="mt-6 p-6 rounded-lg border border-dashed border-border/50 text-center">
          <p className="text-sm text-muted-foreground font-mono">
            // more projects coming soon
          </p>
        </div>

        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default ProjectsSection;
