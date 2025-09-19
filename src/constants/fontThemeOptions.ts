import sansIcon from "../assets/images/icon-font-sans-serif.svg";
import serifIcon from "../assets/images/icon-font-serif.svg";
import monoIcon from "../assets/images/icon-font-monospace.svg";

const colorThemeOptions = [
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

export default colorThemeOptions;
