import lightThemeIcon from "../../assets/icons/svg/icon-sun.svg";
import darkThemeIcon from "../../assets/icons/svg/icon-moon.svg";

const colorThemeOptions = [
  {
    id: "light",
    title: "Light Mode",
    description: "Pick a clean and classic light theme",
    icon: lightThemeIcon,
    value: "light",
  },
  {
    id: "dark",
    title: "Dark Mode",
    description: "Select a sleek and modern dark theme",
    icon: darkThemeIcon,
    value: "dark",
  },
];

export default colorThemeOptions;
