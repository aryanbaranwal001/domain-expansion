import { useState, useEffect } from "react";
import profileImg from "@/assets/profile.png";

const navItems = ["about", "skills", "projects", "contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
          className="flex items-center gap-2 font-mono text-sm text-primary tracking-wider hover:glow-text transition-all"
        >
          <div className="h-6 w-6 rounded-full overflow-hidden border border-primary/20 flex items-center justify-center bg-muted shrink-0">
            <img src={profileImg} alt="Mahoraga" className="aspect-square h-full w-full object-cover" />
          </div>
          mahoraga
        </button>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-mono"
            >
              .{item}()
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
