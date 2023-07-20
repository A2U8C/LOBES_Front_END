import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Color Theme Tokens

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3D3D3D",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#A3A3A3",
          800: "#C2C2C2",
          900: "#FFFFFF",
        },

        blues: {
          100: "#060319",
          200: "#0D0832",
          300: "#16104A",
          400: "#231A63",
          500: "#33297C",
          600: "#473C96",
          700: "#645AB0",
          800: "#9089CB",
          900: "#D6D4E5",
        },
        yellowAccent: {
          100: "#F9B138",
          200: "#F9AB2A",
          300: "#F9A61C",
          400: "#F9A00E",
          500: "#F99B00",
          600: "#EF9400",
          700: "#E58E00",
          800: "#DB8700",
          900: "#D18100",
        },

        greenAccent: {
          100: "#E6F7F2",
          200: "#A8EFD9",
          300: "#89E6CA",
          400: "#76DEBE",
          500: "#64D6B2",
          600: "#51CDA6",
          700: "#42C59B",
          800: "#34BC90",
          900: "#28B486",
        },
      }
    : {
        grey: {
          100: "#FFFFFF",
          200: "#C2C2C2",
          300: "#A3A3A3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3D3D3D",
          800: "#292929",
          900: "#141414",
        },
        blues: {
          100: "#D6D4E5",
          200: "#9089CB",
          300: "#645AB0",
          400: "#473C96",
          500: "#33297C",
          600: "#231A63",
          700: "#16104A",
          800: "#0D0832",
          900: "#060319",
        },
        yellowAccent: {
          100: "#D18100",
          200: "#DB8700",
          300: "#E58E00",
          400: "#EF9400",
          500: "#F99B00",
          600: "#F9A00E",
          700: "#F9A61C",
          800: "#F9AB2A",
          900: "#F9B138",
        },

        greenAccent: {
          100: "#28B486",
          200: "#34BC90",
          300: "#42C59B",
          400: "#51CDA6",
          500: "#64D6B2",
          600: "#76DEBE",
          700: "#89E6CA",
          800: "#A8EFD9",
          900: "#E6F7F2",
        },
      }),
});
// MUI Theme Settings

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.blues[500],
            },

            secondary: {
              main: colors.yellowAccent[500],
            },

            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },

            greens: {
              dark: colors.greenAccent[900],
              main: colors.greenAccent[600],
              light: colors.greenAccent[400],
            },
            background: {
              default: colors.grey[100],
            },
          }
        : {
            primary: {
              main: colors.blues[100],
            },

            secondary: {
              main: colors.yellowAccent[500],
            },

            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            greens: {
              dark: colors.greenAccent[900],
              main: colors.greenAccent[600],
              light: colors.greenAccent[400],
            },
            background: {
              default: colors.grey[100],
            },
          }),
    },

    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// Color Context Mode
export const ColorContextMode = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
