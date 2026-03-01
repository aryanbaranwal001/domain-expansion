import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/aryanbaranwal001" },
  { icon: Twitter, label: "X / Twitter", href: "https://x.com/0x_Mahoraga" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aryan-baranwal-64256b322/" },
  { icon: Mail, label: "Email", href: "mailto:erenyeager108013@gmail.com" },
];

const SocialSidebar = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 z-50 px-3 py-6 bg-card/50 backdrop-blur-md border border-border rounded-full"
    >
      <div className="flex flex-col items-center gap-6">
        {socials.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            <social.icon className="w-5 h-5" />
            <span className="sr-only">{social.label}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialSidebar;
