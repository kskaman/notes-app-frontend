import { type ReactNode } from "react";
import useIsMobile from "../../../hooks/useIsMobile";
import { Outlet, useLocation } from "react-router";
import MobilePageView from "./mobile-page-view";
import DesktopPageView from "./desktop-page-view";

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
