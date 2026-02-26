/**
 * Central theme configuration for the portfolio.
 * Using hex hashes as requested.
 */
export const theme = {
  primary: "#FF9F1C", // Vibrant Orange-Yellow
  primaryGlow: "rgba(255, 159, 28, 0.4)",
  primaryDeep: "#CC7A00",
  background: "#050505", // Deep Domain Black
  foreground: "#E2E8F0", // Light Grey/White
  muted: "#64748B",
  border: "#1E293B",
  card: "#0A0A0A",
  
  // Convert HSL for CSS variables (Internal use)
  hsl: {
    primary: "35 100% 55%",
    background: "220 20% 2%",
    foreground: "210 15% 90%",
  }
};
