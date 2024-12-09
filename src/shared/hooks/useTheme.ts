import { useState, useEffect } from "react";
import { Theme } from "@/shared/interfaces/theme";

export function useTheme() {
  const [themeConfig, setThemeConfig] = useState<Theme | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("themeConfig");
      if (storedTheme) {
        const parsedTheme = JSON.parse(storedTheme) as Theme;
        setThemeConfig(parsedTheme);
      } else {
        setThemeConfig({
          primaryColor: "#1890ff",
          secondaryColor: "#ff4d4f",
          theme: "light",
        });
      }
    }
  }, []);

  return themeConfig;
}
