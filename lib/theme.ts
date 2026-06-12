export const theme = {
  colors: {
    bg: "#0D0D0D",
    surface: "#141414",
    surfaceElevated: "#1A1A1A",
    border: "rgba(79, 209, 197, 0.15)",
    accent: "#4FD1C5",
    accentMuted: "rgba(79, 209, 197, 0.6)",
    text: "#FFFFFF",
    textMuted: "rgba(255, 255, 255, 0.65)",
    textDim: "rgba(255, 255, 255, 0.4)",
  },
  gradients: {
    cta: "linear-gradient(135deg, #4FD1C5 0%, #6B46C1 100%)",
    card: "linear-gradient(160deg, rgba(79, 209, 197, 0.12) 0%, rgba(20, 20, 20, 1) 60%)",
    portrait: "linear-gradient(180deg, rgba(79, 209, 197, 0.08) 0%, #141414 100%)",
  },
  fonts: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    display: "'Inter', system-ui, -apple-system, sans-serif",
  },
  maxWidth: 1200,
  sectionPadding: "80px 24px",
} as const;
