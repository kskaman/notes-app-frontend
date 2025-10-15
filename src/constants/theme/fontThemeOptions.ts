import sansIcon from "../../assets/icons/svg/icon-font-sans-serif.svg";
import serifIcon from "../../assets/icons/svg/icon-font-serif.svg";
import monoIcon from "../../assets/icons/svg/icon-font-monospace.svg";
export const fontThemeOptions = [
  {
    id: "sans-serif",
    title: "Sans-serif",
    description: "Clean and modern, easy to read.",
    icon: sansIcon,
    value: "sans-serif",
  },
  {
    id: "serif",
    title: "Serif",
    description: "Classic and elegant for a timeless feel.",
    icon: serifIcon,
    value: "serif",
  },
  {
    id: "monospace",
    title: "Monospace",
    description: "Code-like, great for a technical vibe.",
    icon: monoIcon,
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
