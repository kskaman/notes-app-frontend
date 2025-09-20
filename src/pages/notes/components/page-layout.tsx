import { useEffect, useRef, type ReactNode } from "react";
import useIsMobile from "../../../hooks/useIsMobile";
import { Outlet, useLocation, useNavigate } from "react-router";
import MobilePageView from "./mobile-page-view";
import DesktopPageView from "./desktop-page-view";

interface Props {
  heading: string;
  children: ReactNode; // the sidebar/list
  rootPath: string; // e.g. "/settings"
  desktopLink: string; // e.g. "/settings/color-theme"
  mobileLink: string; // usually "/settings"
}

const PageLayout = ({
  children,
  heading,
  rootPath,
  desktopLink,
  mobileLink,
}: Props) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const didInit = useRef(false);

  const isAtRoot = location.pathname === rootPath;

  // Redirect only once (on first mount) and only if we are at the root
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    if (isAtRoot) {
      navigate(isMobile ? mobileLink : desktopLink, { replace: true });
    }
  }, [isAtRoot, isMobile, navigate, desktopLink, mobileLink]);

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

export default PageLayout;
