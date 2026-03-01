/**
 * THEME DEFAULTS
 * 
 * This is the central "struct" for the entire website's theme.
 * Modifying these values will update the theme globally.
 * Values are in HEX format.
 */
export const themeConfig = {
  // Main colors
  bg: "#08131d",
  text: "#fefffc",
  
  // Branding
  primary: "#ff9f1c",
  secondary: "#177e89",
  
  // UI Components
  card: "#0a1f2f",
  cardText: "#fefffc",
  popover: "#08131d",
  popoverText: "#fefffc",
  
  // States
  muted: "#15222d",
  mutedText: "#758b9a",
  accent: "#177e89",
  accentText: "#fefffc",
  destructive: "#ef4444",
  destructiveText: "#fefffc",
  
  // Borders & Inputs
  border: "#0a1f2f",
  input: "#0a1f2f",
  ring: "#ff9f1c",

  // Sidebar specific
  sidebar: {
    bg: "#08131d",
    text: "#fefffc",
    primary: "#ff9f1c",
    primaryText: "#08131d",
    accent: "#0a1f2f",
    accentText: "#fefffc",
    border: "#0a1f2f",
    ring: "#ff9f1c",
  },

  // Other tokens
  radius: "0.375rem",
} as const;

export type ThemeConfig = typeof themeConfig;

/**
 * Helper to convert Hex to HSL string format "H S% L%"
 * This allows us to keep using HSL in CSS/Tailwind which is required for opacity modifiers.
 */
function hexToHsl(hex: string): string {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Parse r, g, b
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

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
  
  // Apply main colors using the map and converting Hex to HSL numbers
  Object.entries(config).forEach(([key, value]) => {
    if (typeof value === 'string' && variableMap[key]) {
      root.style.setProperty(variableMap[key], hexToHsl(value));
    }
  });

  // Apply sidebar colors
  Object.entries(config.sidebar).forEach(([key, value]) => {
    const suffix = key === 'bg' ? 'background' : 
                   key === 'text' ? 'foreground' : 
                   key === 'primaryText' ? 'primary-foreground' :
                   key === 'accentText' ? 'accent-foreground' :
                   key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
    
    root.style.setProperty(`--sidebar-${suffix}`, hexToHsl(value as string));
  });

  // Special cases
  root.style.setProperty('--radius', config.radius);
  
  // Primary/Secondary foregrounds mapped to bg/text respectively
  root.style.setProperty('--primary-foreground', hexToHsl(config.bg)); 
  root.style.setProperty('--secondary-foreground', hexToHsl(config.text));
}
