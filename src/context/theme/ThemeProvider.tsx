import { type ReactNode, useState, useEffect, useCallback } from "react";
import { ThemeContext, type ThemeOptionsType } from "@/context/theme/ThemeContext";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const getThemeByTime = useCallback((): ThemeOptionsType => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 7) return "dawn" as ThemeOptionsType;
    if (hour >= 7 && hour < 12) return "morning" as ThemeOptionsType;
    if (hour >= 12 && hour < 17) return "noon" as ThemeOptionsType;
    if (hour >= 17 && hour < 20) return "evening" as ThemeOptionsType;
    return "night" as ThemeOptionsType;
  }, []);

  const [theme, setTheme] = useState<ThemeOptionsType>(getThemeByTime);
  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getThemeByTime();
      document.documentElement.setAttribute('data-theme', newTheme);
      setTheme((prev) => (prev !== newTheme ? newTheme : prev));
    };
    updateTheme();
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, [getThemeByTime]);

  const applyTheme = (newTheme: ThemeOptionsType) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}