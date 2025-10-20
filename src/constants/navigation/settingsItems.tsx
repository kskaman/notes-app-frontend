import { ChangePasswordIcon, FontThemeIcon, SunIcon } from "../../assets";

export const SETTINGS_ITEMS = [
  {
    name: "Color Theme",
    to: "/settings/color-theme",
    icon: <SunIcon width={20} height={20} color={`var(--option-icon)`} />,
  },
  {
    name: "Font Theme",
    to: "/settings/font-theme",
    icon: <FontThemeIcon width={20} height={20} color={`var(--option-icon)`} />,
  },
  {
    name: "Change Password",
    to: "/settings/change-password",
    icon: (
      <ChangePasswordIcon width={20} height={20} color={`var(--option-icon)`} />
    ),
  },
];
