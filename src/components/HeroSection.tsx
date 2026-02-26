import React, { Suspense, lazy } from "react";
import { theme } from "@/lib/theme";

const WheelViewer = lazy(() => import("./WheelViewer"));

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center overflow-hidden px-6 pt-24 pb-24 md:pb-32"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Wheel Section */}
        <div className="w-full mb-4">
          <Suspense fallback={<div className="w-full h-[400px] animate-pulse bg-slate-900/20 rounded-xl" />}>
            <WheelViewer scale={0.035} />
          </Suspense>
        </div>

        {/* Text Section */}
        <div className="w-full max-w-3xl flex flex-col items-center -mt-28">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight opacity-0 animate-fade-in-delay-1">
            <span style={{ color: theme.primary }} className="glow-text">Aryan</span>{" "}
            <span className="text-foreground/90 opacity-80 font-medium">Baranwal</span>
          </h1>

          <p className="font-mono text-sm mt-3 opacity-0 animate-fade-in-delay-2 group cursor-default" style={{ color: `${theme.primary}99` }}>
            aka{" "}
            <span className="transition-colors duration-700" style={{ color: `${theme.primary}66` }}>
              0x_Mahoraga
            </span>
          </p>

          <p className="mt-6 text-lg text-secondary-foreground opacity-0 animate-fade-in-delay-2 max-w-xl mx-auto">
            Backend • Distributed Systems • Blockchain Infrastructure
          </p>

          <p className="mt-4 text-muted-foreground text-sm leading-relaxed opacity-0 animate-fade-in-delay-3 max-w-2xl mx-auto">
            Undergraduate at IIT Roorkee, building scalable backend systems and blockchain
            infrastructure. Interested in the intersection of distributed systems and real-world
            system design.
          </p>

          <div className="mt-8 flex items-center gap-4 opacity-0 animate-fade-in-delay-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 text-primary-foreground text-sm font-medium rounded-md transition-all duration-300"
              style={{ 
                backgroundColor: theme.primary,
                boxShadow: `0 0 25px ${theme.primary}4D` 
              }}
            >
              View Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 border border-border text-sm font-medium rounded-md text-secondary-foreground hover:text-primary transition-all duration-300"
              style={{ borderColor: `${theme.border}` }}
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
