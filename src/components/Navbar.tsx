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
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <Link to="/" className="flex items-center gap-3 font-main text-xl font-bold text-primary tracking-tight group">
          <img 
            src="/mahoraga.png" 
            alt="0x_Mahoraga" 
            className="w-10 h-10 rounded-full object-cover border border-primary/20 shadow-lg group-hover:border-primary/50 transition-colors"
          />
          0x_Mahoraga
        </Link>
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 text-base font-main transition-colors duration-200 rounded-sm ${
                location.pathname === item.path
                  ? "text-primary font-medium"
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
