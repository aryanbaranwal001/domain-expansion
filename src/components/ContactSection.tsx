import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:aryan@example.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-mono text-sm text-primary mb-2">// contact</h2>
        <h3 className="text-3xl font-bold mb-4">Let's Connect</h3>
        <p className="text-sm text-muted-foreground mb-10 max-w-md mx-auto">
          Open to conversations about distributed systems, blockchain infrastructure, or any
          interesting engineering challenge.
        </p>

        <div className="flex items-center justify-center gap-4">
          {links.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-lg border border-border gradient-card cursed-glow transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:drop-shadow-[0_0_8px_hsl(172_66%_50%/0.5)] transition-all duration-500" />
            </a>
          ))}
        </div>

        <p className="mt-16 font-mono text-xs text-muted-foreground/40">
          A calm, intelligent system… that quietly adapts.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
