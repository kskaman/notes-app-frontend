import { NavLink } from "react-router";
import logo from "../../../assets/logo.svg";

import { NAV_LINKS, SETTINGS_LINK } from "../../../constants/navLinkItems";
import leftArrowIcon from "../../../assets/images/icon-arrow-left.svg";
import logoutIcon from "../../../assets/images/icon-logout.svg";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <div
      className="flex flex-col items-center bg-(--main-container-bg)
           px-4 py-3 h-full"
    >
      {/* logo */}
      <div className="w-full flex items-center py-[12px]">
        <img src={logo} alt="logo" />
      </div>

      {/* navigation links */}
      <nav>
        {NAV_LINKS.map((navItem) => {
          return (
            <NavLink
              to={navItem.to}
              className={({ isActive }) =>
                isActive
                  ? `flex items-center gap-2 justify-between
                              py-[10px] text-(--nav-item-text-hover-color)`
                  : `flex items-center  gap-2 justify-between
                          py-[10px]   text-(--nav-item-text-color) 
                            `
              }
              key={navItem.name}
            >
              <div className="flex items-center gap-2">
                <img
                  src={navItem.icon}
                  alt={navItem.name}
                  className="w-6 h-6"
                />
                <span className="text-preset-4 ">{navItem.name}</span>
              </div>

              <div>
                <img src={leftArrowIcon} alt="right arrow" />
              </div>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto">
        {/* settings * logout */}
        <NavLink
          to={SETTINGS_LINK.to}
          className={({ isActive }) =>
            isActive
              ? `flex items-center gap-2
         py-[10px]text-(--nav-item-text-hover-color)`
              : `flex items-center  py-[10px]
        text-(--nav-item-text-color) 
        `
          }
          key={SETTINGS_LINK.name}
        >
          <div className="flex items-center gap-2">
            <img
              src={SETTINGS_LINK.icon}
              alt={SETTINGS_LINK.name}
              className="w-6 h-6"
            />
            <span className="text-preset-4 ">{SETTINGS_LINK.name}</span>
          </div>

          <div>
            <img src={leftArrowIcon} alt="right arrow" />
          </div>
        </NavLink>

        <div
          className="flex items-center gap-2   py-[10px]
        text-(--nav-item-text-color)"
          onClick={logout}
        >
          <img src={logoutIcon} alt="logout" className="w-6 h-6" />
          <span className="text-preset-4">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
