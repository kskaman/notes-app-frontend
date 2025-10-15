import { HomeIcon, ArchivedIcon, SettingsIcon, SearchIcon } from "../../assets";

export const NAV_LINKS = [
  {
    name: "Home",
    to: "/home",
    Icon: HomeIcon,
  },
  {
    name: "Archived",
    to: "/archived",
    Icon: ArchivedIcon,
  },
  {
    name: "Search",
    to: "/search",
    Icon: SearchIcon,
  },
];

export const SETTINGS_LINK = {
  name: "Settings",
  to: "/settings",
  Icon: SettingsIcon,
};
