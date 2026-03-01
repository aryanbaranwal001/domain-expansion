import { socials } from "@/config/socials";

const Footer = () => {
  return (
    <footer className="border-t border-border py-6 mt-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-main text-muted-foreground">
            © 2025 Aryan Baranwal. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socials.filter(s => s.label !== "Email").map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-main uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
