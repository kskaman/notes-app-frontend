import { Outlet, useLocation } from "react-router";
import useIsMobile from "../../hooks/useIsMobile";
import { BaseLayout, LogoBar } from "./BaseLayout";
import DesktopHeader from "../page-headers/desktop-header";
import MobileHeader from "../page-headers/mobile-header";
import type { StandardPageLayoutProps } from "../../types/layouts";

const StandardPageLayout = ({
  heading,
  children,
  variant = "main",
  rootPath,
}: StandardPageLayoutProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();

  const isAtRoot = rootPath ? location.pathname === rootPath : true;
  const layoutKey = isMobile ? "mobile" : "desktop";

  if (variant === "main") {
    // Main page layout (like home, archived)
    return (
      <BaseLayout
        showLogoBar={isMobile}
        header={
          isMobile ? (
            <MobileHeader heading={heading} />
          ) : (
            <DesktopHeader heading={heading} />
          )
        }
      >
        <div className={"h-full w-full flex flex-col py-4 px-8 gap-4"}>
          {children}
        </div>
      </BaseLayout>
    );
  }

  // Sub-page layout (like settings with sidebar)
  if (isMobile) {
    return (
      <div key={layoutKey} className="h-full">
        <LogoBar />
        {isAtRoot ? (
          <BaseLayout header={<MobileHeader heading={heading} />}>
            <div className="h-full w-full flex flex-col px-8 gap-4">
              {children}
            </div>
          </BaseLayout>
        ) : (
          <Outlet key={location.key} />
        )}
      </div>
    );
  }

  // Desktop sub-page layout
  return (
    <BaseLayout header={<DesktopHeader heading={heading} />}>
      <div className="flex flex-1 flex-col lg:flex-row h-full">
        <div
          className="w-[300px] h-full border-r border-(--divider) 
        py-4 pr-4 pl-8 shrink-0 flex flex-col gap-4 overflow-y-auto"
        >
          {children}
        </div>
        <Outlet />
      </div>
    </BaseLayout>
  );
};

export default StandardPageLayout;
