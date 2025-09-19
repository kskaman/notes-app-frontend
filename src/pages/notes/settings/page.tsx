import { NavLink, Outlet } from "react-router";
import { SETTINGS_ITEMS } from "../../../constants/settingsItems";
import clsx from "clsx";
import leftArrowIcon from "../../../assets/images/icon-arrow-left.svg";

const baseNavClasses = `
  flex items-center gap-2 justify-between py-[10px] px-3
  rounded-[8px] w-full 
`;

const inactiveText = `text-(--nav-item-text-color)`;
const activeText = `bg-(--nav-item-bg-active) text-(--nav-item-text-active-color)`;

const SettingsPage = () => {
  return (
    <div className="h-full flex flex-col lg:flex-row">
      <div
        className="w-full lg:w-[242px] h-full 
      border-r border-(--divider)
      py-5 pr-4 pl-8
      flex flex-col gap-4 overflow-y-auto"
      >
        {SETTINGS_ITEMS.map(({ name, to, icon }) => (
          <NavLink
            to={to}
            className={({ isActive }) =>
              clsx(baseNavClasses, isActive ? activeText : inactiveText)
            }
            key={name}
          >
            {({ isActive }) => (
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
        ))}
      </div>

      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsPage;
