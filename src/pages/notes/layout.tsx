import { Outlet } from "react-router";
import { useState } from "react";
import clsx from "clsx";
import { useMatches } from "react-router";

import logo from "../../assets/logo.svg";
import Sidebar from "./components/navbar/Sidebar";
import BottomNavbar from "./components/navbar/BottomNavbar";

const NotesLayout = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const matches = useMatches();
  const current = matches.find(
    (m) =>
      typeof m.handle === "object" && m.handle !== null && "header" in m.handle
  );

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* desktop sidebar */}
      <aside
        className={clsx(
          "hidden lg:flex transition-all duration-200 h-full",
          expanded ? "max-w-300px w-1/5" : "w-[60px] ",
          "border-r border-(--divider)"
        )}
      >
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
      </aside>

      {/* page content */}
      <main className="flex-1 pb-16 lg:pb-0 flex flex-col">
        <header
          className="hidden lg:flex w-full flex items-center justify-between px-8
            h-[80px] border-b border-(--divider)"
        >
          {/* desktop page header */}
          <h1 className="text-preset-1">
            {(current?.handle as { header?: string })?.header || "Notes"}
          </h1>
        </header>

        {/* mobile + tablet logo bar + page header */}
        <div className="lg:hidden">
          <div
            className="w-full h-[54px] md:h-[74px]
            flex items-center justify-start
            px-4 md:px-8 bg-(--logo-bar-background)"
          >
            <img src={logo} alt="logo" className="h-7 w-auto" />
          </div>
          <header
            className="flex lg:hidden w-full flex items-center justify-between px-8
          md:h-[29px] mt-5 md:mt-6 mb-4"
          >
            {/* desktop page header */}
            <h1 className="text-preset-1">
              {(current?.handle as { header?: string })?.header || "Notes"}
            </h1>
          </header>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0">
          <Outlet />
        </div>
      </main>
      {/* tab + mobile divider */}
      <div className={"lg:hidden flex flex-col"}>
        {/* mobile bottom nav (fixed) */}
        <div className="h-[56px] sm:h-[74px] border-t border-(--divider)">
          <BottomNavbar />
        </div>
      </div>
    </div>
  );
};

export default NotesLayout;
