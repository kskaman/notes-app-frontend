import { MonospaceIcon, SansIcon, SerifIcon } from "../../assets";
export const fontThemeOptions = [
  {
    id: "sans-serif",
    title: "Sans-serif",
    description: "Clean and modern, easy to read.",
    icon: SansIcon,
    value: "sans-serif",
  },
  {
    id: "serif",
    title: "Serif",
    description: "Classic and elegant for a timeless feel.",
    icon: SerifIcon,
    value: "serif",
  },
  {
    id: "monospace",
    title: "Monospace",
    description: "Code-like, great for a technical vibe.",
    icon: MonospaceIcon,
    value: "monospace",
  },
];

export const FAMILY_CLASS: Record<
  "sans-serif" | "serif" | "monospace",
  string
> = {
  "sans-serif": "font-sans",
  serif: "font-serif",
  monospace: "font-mono",
};
