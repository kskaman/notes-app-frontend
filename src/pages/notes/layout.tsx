import { Outlet } from "react-router";
import { useState } from "react";
import clsx from "clsx";

import Sidebar from "./components/navbar/Sidebar";
import BottomNavbar from "./components/navbar/BottomNavbar";

const NotesLayout = () => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* desktop sidebar */}
      <aside
        className={clsx(
          "hidden lg:flex transition-all duration-200 h-full",
          expanded ? "w-1/5" : "w-[60px] ",
          "border-r border-(--divider)"
        )}
      >
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
      </aside>

      {/* page content */}
      <main className="flex-1 overflow-y-auto pt-4 pb-16 lg:pb-0">
        {/* top/bottom padding keeps content above mobile nav */}
        <Outlet />
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
