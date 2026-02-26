import { Code, Server, Database, GitBranch, Box, Terminal } from "lucide-react";

const skills = [
  { icon: Server, label: "Backend Development", desc: "Scalable APIs, microservices, server architecture" },
  { icon: Database, label: "Blockchain Infrastructure", desc: "Indexers, on-chain data, smart contract backends" },
  { icon: Box, label: "System Design", desc: "Distributed systems, consensus, fault tolerance" },
  { icon: Code, label: "Rust & Go", desc: "Performance-first systems programming" },
  { icon: GitBranch, label: "DevOps & Infra", desc: "CI/CD, containers, cloud-native tooling" },
  { icon: Terminal, label: "Low-Level Engineering", desc: "Data structures, algorithms, OS internals" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-sm text-primary mb-2">// skills</h2>
        <h3 className="text-3xl font-bold mb-10">What I Work With</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group p-5 rounded-lg border border-border gradient-card cursed-glow transition-all duration-500"
            >
              <Icon className="w-5 h-5 text-primary mb-3 group-hover:drop-shadow-[0_0_8px_hsl(172_66%_50%/0.5)] transition-all duration-500" />
              <h4 className="text-sm font-semibold mb-1">{label}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default SkillsSection;
