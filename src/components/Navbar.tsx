import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Now", path: "/now" },
  { label: "Reading", path: "/reading" },
  { label: "Blog", path: "/blog" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-14 px-6">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm font-medium text-primary tracking-tight group">
          <img 
            src="/mahoraga.png" 
            alt="0x_Mahoraga" 
            className="w-6 h-6 rounded-full object-cover border border-primary/20"
          />
          0x_Mahoraga
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 text-xs font-mono transition-colors duration-200 rounded-sm ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
