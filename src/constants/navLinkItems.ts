import homeIcon from "../assets/icons/HomeIcon";
import archivedIcon from "../assets/icons/ArchivedIcon";
import settingsIcon from "../assets/icons/SettingsIcon";
import searchIcon from "../assets/icons/SearchIcon";

export const NAV_LINKS = [
  {
    name: "Home",
    to: "/home",
    Icon: homeIcon,
  },
  {
    name: "Archived",
    to: "/archived",
    Icon: archivedIcon,
  },
  {
    name: "Search",
    to: "/search",
    Icon: searchIcon,
  },
];

export const SETTINGS_LINK = {
  name: "Settings",
  to: "/settings",
  Icon: settingsIcon,
};
