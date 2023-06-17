import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

const lightModeColors = {
    indigo: {
        100: "#dfd4ec",
        200: "#bea9d9",
        300: "#9e7dc7",
        400: "#7d52b4",
        500: "#5d27a1",
        600: "#4a1f81",
        700: "#381761",
        800: "#251040",
        900: "#130820",
    },
    turquoise: {
        100: "#dff0f1",
        200: "#bfe1e3",
        300: "#a0d2d4",
        400: "#80c3c6",
        500: "#3DA5AB",
        600: "#4d9093",
        700: "#3a6c6e",
        800: "#fbfcfa",
        900: "#132425",
    },
    black: {
        100: "#d9d9d9",
        200: "#b3b3b3",
        300: "#8c8c8c",
        400: "#666666",
        500: "#404040",
        600: "#333333",
        700: "#262626",
        800: "#1a1a1a",
        900: "#0d0d0d",
    },
    white: {
        100: "#fefefe",
        200: "#fdfefd",
        300: "#f0f0f0",
        400: "#fcfdfb",
        500: "#fcfdfb",
        600: "#fcfdfb",
        700: "#fcfdfb",
        800: "#f7f7f7",
        900: "#eeeeee",
    },
};

const darkModeColors = {
    indigo: {
        100: "#0a0011",
        200: "#bfe1e3",
        300: "#a0d2d4",
        400: "#80c3c6",
        500: "#60b4b8",
        600: "#4d9093",
        700: "#3a6c6e",
        800: "#26484a",
        900: "#132425",
    },
    turquoise: {
        100: "#dfd4ec",
        200: "#bea9d9",
        300: "#9e7dc7",
        400: "#7d52b4",
        500: "#a0d2d4",
        600: "#80c3c6",
        700: "#381761",
        800: "#251040",
        900: "#130820",
    },
    black: {
        100: "#fefefe",
        200: "#fdfefd",
        300: "#fdfdfc",
        400: "#fcfdfb",
        500: "#c9cac8",
        600: "#c9cac8",
        700: "#979796",
        800: "#646564",
        900: "#323232",
    },
    white: {
        100: "#d9d9d9",
        200: "#b3b3b3",
        300: "#8c8c8c",
        400: "#666666",
        500: "#404040",
        600: "#333333",
        700: "#262626",
        800: "#1a1a1a",
        900: "#0d0d0d",
    },
};

export const tokens = (mode) => ({
    ...(mode === "light" ? lightModeColors : darkModeColors),
});

export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "light"
                ? {
                      primary: {
                          main: colors.indigo[500],
                      },
                      secondary: {
                          main: colors.turquoise[500],
                      },
                      neutral: {
                          dark: colors.black[900],
                          main: colors.black[500],
                          light: colors.black[100],
                      },
                      background: {
                          default: colors.white[800],
                      },
                  }
                : {
                      primary: {
                          main: colors.indigo[400],
                      },
                      secondary: {
                          main: colors.indigo[500],
                      },
                      neutral: {
                          dark: colors.black[900],
                          main: colors.black[500],
                          light: colors.black[100],
                      },
                      background: {
                          default: colors.white[800],
                      },
                  }),
        },
    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [mode, setMode] = useState(
        localStorage.getItem("themeMode")
            ? localStorage.getItem("themeMode")
            : "light"
    );
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );
    const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
    localStorage.setItem("themeMode", mode);
    return [theme, colorMode];
};
