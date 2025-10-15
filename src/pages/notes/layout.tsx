import { Outlet } from "react-router";
import { useState } from "react";
import clsx from "clsx";

import useIsMobile from "../../hooks/useIsMobile";
import { BottomNavbar, Sidebar } from "../../ui";

const NotesLayout = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {!isMobile && (
        <>
          {/* desktop sidebar */}
          <aside
            className={clsx(
              "flex transition-all duration-200 h-full shrink-0",
              expanded ? "w-[300px]" : "w-[60px] ",
              "border-r border-(--divider)"
            )}
          >
            <Sidebar expanded={expanded} setExpanded={setExpanded} />
          </aside>
        </>
      )}

      {/* page content */}
      <main className="flex-1 pb-16 lg:pb-0">
        <div className="h-full">
          <Outlet />
        </div>
      </main>

      {/* tab + mobile divider */}
      {isMobile && (
        <>
          <div className={"lg:hidden flex flex-col"}>
            {/* mobile bottom nav (fixed) */}
            <div className="h-[56px] sm:h-[74px] border-t border-(--divider)">
              <BottomNavbar />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotesLayout;
