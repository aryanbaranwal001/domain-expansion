/**
 * THEME DEFAULTS
 * 
 * This is the central "struct" for the entire website's theme.
 * Modifying these values will update the theme globally.
 * Values are HSL components.
 */
export const themeConfig = {
  // Main colors
  bg: "210 52% 7%",
  text: "60 100% 99%",
  
  // Branding
  primary: "32 100% 55%",
  secondary: "185 73% 31%",
  
  // UI Components
  card: "210 72% 14%",
  cardText: "60 100% 99%",
  popover: "210 52% 7%",
  popoverText: "60 100% 99%",
  
  // States
  muted: "210 40% 14%",
  mutedText: "210 20% 55%",
  accent: "185 73% 31%",
  accentText: "60 100% 99%",
  destructive: "0 84.2% 60.2%",
  destructiveText: "60 100% 99%",
  
  // Borders & Inputs
  border: "210 72% 14%",
  input: "210 72% 14%",
  ring: "32 100% 55%",

  // Sidebar specific
  sidebar: {
    bg: "210 52% 7%",
    text: "60 100% 99%",
    primary: "32 100% 55%",
    primaryText: "210 52% 7%",
    accent: "210 72% 14%",
    accentText: "60 100% 99%",
    border: "210 72% 14%",
    ring: "32 100% 55%",
  },

  // Other tokens
  radius: "0.375rem",
} as const;

export type ThemeConfig = typeof themeConfig;

/**
 * Maps our shorthand JSON keys to the CSS variables used by Tailwind and the UI components.
 */
const variableMap: Record<string, string> = {
  bg: "--background",
  text: "--foreground",
  primary: "--primary",
  secondary: "--secondary",
  card: "--card",
  cardText: "--card-foreground",
  popover: "--popover",
  popoverText: "--popover-foreground",
  muted: "--muted",
  mutedText: "--muted-foreground",
  accent: "--accent",
  accentText: "--accent-foreground",
  destructive: "--destructive",
  destructiveText: "--destructive-foreground",
  border: "--border",
  input: "--input",
  ring: "--ring",
};

export function applyTheme(config: ThemeConfig = themeConfig) {
  const root = document.documentElement;
  
  // Apply main colors using the map
  Object.entries(config).forEach(([key, value]) => {
    if (typeof value === 'string' && variableMap[key]) {
      root.style.setProperty(variableMap[key], value);
    }
  });

  // Apply sidebar colors
  Object.entries(config.sidebar).forEach(([key, value]) => {
    const suffix = key === 'bg' ? 'background' : 
                   key === 'text' ? 'foreground' : 
                   key === 'primaryText' ? 'primary-foreground' :
                   key === 'accentText' ? 'accent-foreground' :
                   key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
    
    root.style.setProperty(`--sidebar-${suffix}`, value as string);
  });

  // Special cases
  root.style.setProperty('--radius', config.radius);
  
  // Also set primary/secondary foregrounds if not explicitly mapped
  root.style.setProperty('--primary-foreground', config.bg); 
  root.style.setProperty('--secondary-foreground', config.text);
}
