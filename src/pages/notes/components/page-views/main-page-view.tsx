import type { ReactNode } from "react";
import useIsMobile from "../../../../hooks/useIsMobile";
import DesktopHeader from "../page-headers/desktop-header";
import MobileHeader from "../page-headers/mobile-header";
import logo from "../../../../assets/logo.svg";

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
          <>
            <div
              className="w-full h-[54px] md:h-[74px]
            flex items-center justify-start
            px-4 md:px-8 bg-(--logo-bar-background)"
            >
              <img src={logo} alt="logo" className="h-7 w-auto" />
            </div>
            <MobileHeader heading={heading} />
          </>
        ) : (
          <DesktopHeader heading={heading} />
        )}
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
};

export default MainPageView;
