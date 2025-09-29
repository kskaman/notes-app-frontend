import type { ReactNode } from "react";
import useIsMobile from "../../../../hooks/useIsMobile";
import DesktopHeader from "../page-headers/desktop-header";
import MobileHeader from "../page-headers/mobile-header";

const MainPageView = ({
  children,
  heading,
}: {
  children: ReactNode;
  heading: string;
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col h-full">
      <div>
        {isMobile ? (
          <MobileHeader heading={heading} />
        ) : (
          <DesktopHeader heading={heading} />
        )}
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};

export default MainPageView;
