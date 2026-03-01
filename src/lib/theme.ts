/**
 * MINIMAL THEME CONFIG
 * 
 * Only the core necessary fields for a clean, professional look.
 * Values are in HEX format.
 */
export const themeConfig = {
  background: "#08131d",
  foreground: "#fefffc",
  primary: "#ff9f1c",
  secondary: "#177e89",
  muted: "#15222d",
  mutedForeground: "#9FB6C5",
  border: "#0a1f2f",
} as const;

export type ThemeConfig = typeof themeConfig;

/**
 * Helper to convert Hex to HSL string format "H S% L%"
 */
function hexToHsl(hex: string): string {
  hex = hex.replace(/^#/, "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

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

export function applyTheme(config: ThemeConfig = themeConfig) {
  const root = document.documentElement;
  const h = (hex: string) => hexToHsl(hex);

  // Core Mapping
  const mappings: Record<string, string> = {
    "--background": h(config.background),
    "--foreground": h(config.foreground),
    "--primary": h(config.primary),
    "--primary-foreground": h(config.background),
    "--secondary": h(config.secondary),
    "--secondary-foreground": h(config.foreground),
    "--muted": h(config.muted),
    "--muted-foreground": h(config.mutedForeground),
    "--border": h(config.border),
    "--input": h(config.border),
    "--ring": h(config.primary),
    "--radius": "0.375rem",
    
    // Components (derived from core)
    "--card": h(config.border),
    "--card-foreground": h(config.foreground),
    "--popover": h(config.background),
    "--popover-foreground": h(config.foreground),
    "--accent": h(config.secondary),
    "--accent-foreground": h(config.foreground),
    "--destructive": h("#ef4444"),
    "--destructive-foreground": h(config.foreground),

    // Sidebar (derived from core)
    "--sidebar-background": h(config.background),
    "--sidebar-foreground": h(config.foreground),
    "--sidebar-primary": h(config.primary),
    "--sidebar-primary-foreground": h(config.background),
    "--sidebar-accent": h(config.border),
    "--sidebar-accent-foreground": h(config.foreground),
    "--sidebar-border": h(config.border),
    "--sidebar-ring": h(config.primary),
  };

  Object.entries(mappings).forEach(([variable, value]) => {
    root.style.setProperty(variable, value);
  });
}
