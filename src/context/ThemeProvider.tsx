import { createContext, useContext, useEffect, useState, useMemo } from "react";
import * as React from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
}>({
    theme: "light",
    setTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        return saved ?? "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const value = useMemo(() => ({
        theme, setTheme
    }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}