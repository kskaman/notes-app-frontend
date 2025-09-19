import colorIcon from "../assets/images/icon-sun.svg";
import fontIcon from "../assets/images/icon-font.svg";
import passwordIcon from "../assets/images/icon-lock.svg";

export const SETTINGS_ITEMS = [
  {
    name: "Color Theme",
    to: "/settings/color-theme",
    icon: <img src={colorIcon} alt="color theme icon" />,
  },
  {
    name: "Font Theme",
    to: "/settings/font-theme",
    icon: <img src={fontIcon} alt="font theme icon" />,
  },
  {
    name: "Change Password",
    to: "/settings/change-password",
    icon: <img src={passwordIcon} alt="change Password" />,
  },
];
