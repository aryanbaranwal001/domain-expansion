const AboutSection = () => {
  const interests = [
    "Distributed Systems",
    "Infrastructure Engineering",
    "Blockchain Backend",
    "System Design",
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-sm text-primary mb-2">// about</h2>
        <h3 className="text-3xl font-bold mb-8">Who I Am</h3>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              I'm an undergraduate at the Indian Institute of Technology, Roorkee (Class of 2028),
              driven by a deep curiosity for how large-scale systems work under the hood.
            </p>
            <p>
              My focus lies in building robust backend infrastructure, understanding distributed
              consensus, and exploring blockchain systems from an engineering-first perspective.
            </p>
            <p className="text-primary/50 font-mono text-xs italic">
              Operates under the alias "Mahoraga" — adapting to complexity, just like systems should.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-mono text-muted-foreground mb-4">core_interests:</h4>
            <div className="space-y-3">
              {interests.map((interest, i) => (
                <div
                  key={interest}
                  className="flex items-center gap-3 py-2.5 px-4 rounded-md border border-border gradient-card cursed-glow transition-all duration-300"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse" />
                  <span className="text-sm text-foreground">{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-divider mt-24" />
      </div>
    </section>
  );
};

export default AboutSection;
