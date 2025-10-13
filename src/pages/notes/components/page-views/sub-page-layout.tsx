import { type ReactNode } from "react";
import useIsMobile from "../../../../hooks/useIsMobile";
import { Outlet, useLocation } from "react-router";
import MobilePageView from "./mobile-page-view";
import DesktopPageView from "./desktop-page-view";
import logo from "../../../../assets/logo.svg";

interface Props {
  heading: string;
  children: ReactNode; // the sidebar/list
  rootPath: string; // e.g. "/settings"
}

const SubPageLayout = ({ children, heading, rootPath }: Props) => {
  const isMobile = useIsMobile();
  const location = useLocation();

  const isAtRoot = location.pathname === rootPath;

  // Force remount of layout tree when switching between mobile/desktop,
  // so <Outlet /> re-resolves correctly.
  const layoutKey = isMobile ? "mobile" : "desktop";

  if (isMobile) {
    // Mobile: show the list at /settings, show the Outlet on subpages
    return (
      <div key={layoutKey} className="h-full">
        <div
          className="w-full h-[54px] md:h-[74px]
            flex items-center justify-start
            px-4 md:px-8 bg-(--logo-bar-background)"
        >
          <img src={logo} alt="logo" className="h-7 w-auto" />
        </div>
        {isAtRoot ? (
          <MobilePageView heading={heading}>{children}</MobilePageView>
        ) : (
          <Outlet key={location.key} />
        )}
      </div>
    );
  }

  // Desktop: Sidebar + Outlet side-by-side
  return (
    <>
      <DesktopPageView heading={heading}>{children}</DesktopPageView>
    </>
  );
};

export default SubPageLayout;
