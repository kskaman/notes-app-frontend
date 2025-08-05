import { NavLink } from "react-router";
import logo from "../../../../assets/logo.svg";

import { NAV_LINKS, SETTINGS_LINK } from "../../../../constants/navLinkItems";
import leftArrowIcon from "../../../../assets/images/icon-arrow-left.svg";
import logoutIcon from "../../../../assets/images/icon-logout.svg";
import { useAuth } from "../../../../context/AuthContext";
import clsx from "clsx";
import Button from "../../../../ui/Button";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const baseNavClasses = `
  flex items-center gap-2 justify-between py-[10px] px-3
  rounded-[8px] w-full 
`;

const inactiveText = `text-(--nav-item-text-color)`;
const activeText = `bg-(--nav-item-bg-active) text-(--nav-item-text-active-color)`;

interface SidebarProps {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
}
const Sidebar = ({ expanded, setExpanded }: SidebarProps) => {
  const { logout } = useAuth();

  return (
    <div
      className={`flex flex-col items-center w-full bg-(--main-container-bg)
           ${
             expanded ? "px-[16px] py-[12px]" : "px-[4px] py-[4px]"
           } h-full gap-4`}
    >
      {/* logo */}
      <div
        className={`w-full flex items-center py-3 h-14 ${
          expanded ? "justify-between" : "justify-center"
        }`}
      >
        {expanded && <img src={logo} alt="logo" className="h-7 w-auto" />}
        {expanded && (
          <Button
            variant="icon"
            icon={<FaArrowLeft />}
            onClick={() => setExpanded(false)}
          />
        )}
        {!expanded && (
          <Button
            variant="icon"
            icon={<FaArrowRight />}
            onClick={() => setExpanded(true)}
          />
        )}
      </div>

      {/* navigation links */}
      <nav className="flex flex-col space-y-1 flex-1 w-full h-full">
        {NAV_LINKS.map(({ name, Icon, to }) => (
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
                  <Icon
                    height={24}
                    width={24}
                    color={`${
                      isActive
                        ? "var(--nav-item-icon-active-color)"
                        : "var(--nav-item-text-color)"
                    }`}
                  />

                  {expanded && <span className="text-preset-4 ">{name}</span>}
                </div>
                {expanded && isActive && (
                  <div>
                    <img
                      src={leftArrowIcon}
                      alt="right arrow"
                      className="w-4 rotate-180"
                    />
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}

        <div className="mt-auto space-y-1">
          {/* settings * logout */}
          <NavLink
            to={SETTINGS_LINK.to}
            className={({ isActive }) =>
              clsx(baseNavClasses, isActive ? activeText : inactiveText)
            }
            key={SETTINGS_LINK.name}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-2">
                  <SETTINGS_LINK.Icon
                    height={24}
                    width={24}
                    color={`${
                      isActive
                        ? "var(--nav-item-icon-active-color)"
                        : "var(--nav-item-text-color)"
                    }`}
                  />
                  {expanded && (
                    <span className="text-preset-4 ">{SETTINGS_LINK.name}</span>
                  )}
                </div>

                {expanded && isActive && (
                  <div>
                    <img
                      src={leftArrowIcon}
                      alt="right arrow"
                      className="w-4 rotate-180"
                    />
                  </div>
                )}
              </>
            )}
          </NavLink>

          <div
            className="flex items-center gap-2 
               py-[10px] px-3 cursor-pointer
              rounded-[8px] w-full 
              text-(--nav-item-text-color)"
            onClick={logout}
          >
            <img src={logoutIcon} alt="logout" className="w-6 rotate-180" />

            {expanded && <span className="text-preset-4">Logout</span>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
