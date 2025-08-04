import homeIcon from "../assets/images/icon-home.svg";
import tagIcon from "../assets/images/icon-tag.svg";
import archivedIcon from "../assets/images/icon-archive.svg";
import trashIcon from "../assets/images/icon-delete.svg";
import settingsIcon from "../assets/images/icon-delete.svg";

export const NAV_LINKS = [
  {
    name: "Home",
    to: "/",
    icon: homeIcon,
  },
  {
    name: "Collections",
    to: "/",
    icon: tagIcon,
  },
  {
    name: "Archived",
    to: "/",
    icon: archivedIcon,
  },
  {
    name: "Trash",
    to: "/",
    icon: trashIcon,
  },
];

export const SETTINGS_LINK = {
  name: "Settings",
  to: "/",
  icon: settingsIcon,
};
