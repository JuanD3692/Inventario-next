import { createTheme } from "@mui/material/styles";

// Paleta de colores base
const colors = {
  // Colores principales
  primary: {
    main: "#4f46e5", // Indigo-600
    light: "#6366f1", // Indigo-500
    dark: "#4338ca", // Indigo-700
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#f59e0b", // Amber-500
    light: "#fbbf24", // Amber-400
    dark: "#d97706", // Amber-600
    contrastText: "#ffffff",
  },
  error: {
    main: "#ef4444", // Red-500
    light: "#f87171", // Red-400
    dark: "#dc2626", // Red-600
  },
  warning: {
    main: "#f97316", // Orange-500
    light: "#fb923c", // Orange-400
    dark: "#ea580c", // Orange-600
  },
  info: {
    main: "#3b82f6", // Blue-500
    light: "#60a5fa", // Blue-400
    dark: "#2563eb", // Blue-600
  },
  success: {
    main: "#10b981", // Emerald-500
    light: "#34d399", // Emerald-400
    dark: "#059669", // Emerald-600
  },
  grey: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  common: {
    black: "#000000",
    white: "#ffffff",
  },
  text: {
    primary: "#1f2937", // Grey-800
    secondary: "#6b7280", // Grey-500
    disabled: "#9ca3af", // Grey-400
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
  },
};

// Gradientes para elementos específicos
const gradients = {
  primary: `linear-gradient(120deg, ${colors.primary.main}, ${colors.primary.light})`,
  secondary: `linear-gradient(120deg, ${colors.secondary.main}, ${colors.secondary.light})`,
  error: `linear-gradient(120deg, ${colors.error.main}, ${colors.error.light})`,
  info: `linear-gradient(120deg, ${colors.info.main}, ${colors.info.light})`,
  success: `linear-gradient(120deg, ${colors.success.main}, ${colors.success.light})`,
  warning: `linear-gradient(120deg, ${colors.warning.main}, ${colors.warning.light})`,
  headerBg: "rgba(255, 255, 255, 1)",
  headerBlur: "blur(8px)",
};

// Sombras
const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
};

// Configuración de componentes
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: "none",
        padding: "8px 16px",
        fontWeight: 500,
      },
      containedPrimary: {
        boxShadow: shadows.sm,
        "&:hover": {
          boxShadow: shadows.md,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        width: "100%",
        margin: "0 auto",
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        padding: 0, // Mantener padding 0 por defecto
        "@media (min-width:600px)": {
          padding: "0 24px", // Añadir padding en pantallas medianas y grandes
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        boxShadow: shadows["2xl"],
        overflowY: "auto",
      },
      scrollPaper: {
        alignItems: "flex-start",
        paddingTop: "2vh",
        paddingBottom: "2vh",
      },
    },
  },
};

// Tipografía
const typography = {
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    '"Open Sans"',
    '"Helvetica Neue"',
    "sans-serif",
  ].join(","),
  h1: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  h2: {
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  h3: {
    fontSize: "1.125rem",
    fontWeight: 600,
  },
  h4: {
    fontSize: "1rem",
    fontWeight: 600,
  },
  h5: {
    fontSize: "0.875rem",
    fontWeight: 600,
  },
  h6: {
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  body1: {
    fontSize: "1rem",
  },
  body2: {
    fontSize: "0.875rem",
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  caption: {
    fontSize: "0.75rem",
  },
};

// Crear el tema
const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
    grey: colors.grey,
    common: colors.common,
    text: colors.text,
    background: colors.background,
  },
  typography,
  components,
  shadows: Array(25)
    .fill("none")
    .map((_, i) => {
      if (i === 1) return shadows.sm;
      if (i === 2) return shadows.md;
      if (i === 3) return shadows.lg;
      if (i === 4) return shadows.xl;
      if (i === 5) return shadows["2xl"];
      return "none";
    }),
});

// Exportación por defecto del tema
export default theme;
// Exportaciones adicionales de utilidades
export { colors, gradients, shadows };
