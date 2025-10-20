import { MoonIcon, SunIcon } from "../../assets";

const colorThemeOptions = [
  {
    id: "light",
    title: "Light Mode",
    description: "Pick a clean and classic light theme",
    icon: SunIcon,
    value: "light",
  },
  {
    id: "dark",
    title: "Dark Mode",
    description: "Select a sleek and modern dark theme",
    icon: MoonIcon,
    value: "dark",
  },
];

export default colorThemeOptions;
