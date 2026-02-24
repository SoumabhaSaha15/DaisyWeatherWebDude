import z from "zod";
import { createContext, type Context } from "react";
export const ThemeOptionsValidator = z.enum(["light", "dark", "dawn", "morning", "noon", "evening", "night"]);
export type ThemeOptionsType = z.infer<typeof ThemeOptionsValidator>;
type ThemeContextProps = {
  theme: ThemeOptionsType;
  applyTheme: (theme: ThemeOptionsType) => void;
}
export const ThemeContext: Context<ThemeContextProps> = createContext<ThemeContextProps>({
  theme: "dark",
  applyTheme: (theme: ThemeOptionsType) => { console.log(theme); },
});
// const useTheme = () => useContext(ThemeContext);