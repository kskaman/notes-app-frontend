import { NavLink } from "react-router";
import clsx from "clsx";
import { SETTINGS_ITEMS } from "../../../constants/settingsItems";
import leftArrowIcon from "../../../assets/images/icon-arrow-left.svg";

const baseNavClasses = `
  flex items-center gap-2 justify-between py-[10px] px-3
  rounded-[8px] w-full 
`;

const inactiveText = `text-(--nav-item-text-color)`;
const activeText = `bg-(--nav-item-bg-active) text-(--nav-item-text-active-color)`;

import PageLayout from "../components/page-layout";

const SettingsPage = () => {
  const items = SETTINGS_ITEMS.map(({ name, to, icon }) => (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) =>
        clsx(baseNavClasses, isActive ? activeText : inactiveText)
      }
      key={name}
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 w-5">{icon}</div>
            <span className="text-preset-4">{name}</span>
          </div>
          <div className="hidden lg:flex lg:justify-center lg:items-center">
            {isActive && (
              <div>
                <img
                  src={leftArrowIcon}
                  alt="right arrow"
                  className="w-4 rotate-180"
                />
              </div>
            )}
          </div>
        </>
      )}
    </NavLink>
  ));

  // Desktop View
  return (
    <PageLayout
      heading="Settings"
      desktopLink="/settings/color-theme"
      mobileLink="/settings"
      rootPath="/settings"
    >
      {items}
    </PageLayout>
  );
};

export default SettingsPage;
