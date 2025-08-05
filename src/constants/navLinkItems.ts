import homeIcon from "../assets/icons/HomeIcon";
import tagIcon from "../assets/icons/CollectionsIcon";
import archivedIcon from "../assets/icons/ArchivedIcon";
import trashIcon from "../assets/icons/TrashIcon";
import settingsIcon from "../assets/icons/SettingsIcon";

export const NAV_LINKS = [
  {
    name: "Home",
    to: "/home",
    Icon: homeIcon,
  },
  {
    name: "Collections",
    to: "/collections",
    Icon: tagIcon,
  },
  {
    name: "Archived",
    to: "/archived",
    Icon: archivedIcon,
  },
  {
    name: "Trash",
    to: "/trash",
    Icon: trashIcon,
  },
];

export const SETTINGS_LINK = {
  name: "Settings",
  to: "/settings",
  Icon: settingsIcon,
};
