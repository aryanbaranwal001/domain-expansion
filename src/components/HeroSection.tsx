import MahoragaWheel from "./MahoragaWheel";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background wheel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <MahoragaWheel size={700} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Text */}
        <div className="w-full flex flex-col items-center">
          <p className="font-mono text-sm text-muted-foreground opacity-0 animate-fade-in mb-2">
            // hello, world
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight opacity-0 animate-fade-in-delay-1">
            Aryan
            <br />
            <span className="text-primary glow-text">Baranwal</span>
          </h1>

          <p className="font-mono text-sm text-primary/60 mt-3 opacity-0 animate-fade-in-delay-2 group cursor-default">
            aka{" "}
            <span className="text-primary/40 group-hover:text-primary transition-colors duration-700">
              0x_Mahoraga
            </span>
          </p>

          <p className="mt-6 text-lg text-secondary-foreground opacity-0 animate-fade-in-delay-2 max-w-md mx-auto">
            Backend • Distributed Systems • Blockchain Infrastructure
          </p>

          <p className="mt-4 text-muted-foreground text-sm leading-relaxed opacity-0 animate-fade-in-delay-3 max-w-lg mx-auto">
            Undergraduate at IIT Roorkee, building scalable backend systems and blockchain
            infrastructure. Interested in the intersection of distributed systems and real-world
            system design.
          </p>

          <div className="mt-8 flex items-center gap-4 opacity-0 animate-fade-in-delay-3 justify-center">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:shadow-[0_0_25px_hsl(172_66%_50%/0.3)] transition-all duration-300"
            >
              View Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 border border-border text-sm font-medium rounded-md text-secondary-foreground hover:border-primary/30 hover:text-primary transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
