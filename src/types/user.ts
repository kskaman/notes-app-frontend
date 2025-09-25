export type User = {
  id: string;
  name?: string;
  email: string;
  password: string;
  colorTheme: ColorTheme;
  fontTheme: FontTheme;
};

export type ColorTheme = "light" | "dark";
export type FontTheme = "sans-serif" | "serif" | "monospace";
