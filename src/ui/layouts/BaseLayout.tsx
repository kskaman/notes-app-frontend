import clsx from "clsx";
import useIsMobile from "../../hooks/useIsMobile";
import { logo } from "../../assets";
import type { LogoBarProps, BaseLayoutProps, ResponsiveLayoutProps } from "../../types/layouts";

export const LogoBar = ({ className }: LogoBarProps) => (
  <div
    className={clsx(
      "flex items-center h-14 px-4 border-b border-(--divider) bg-(--main-bg)",
      className
    )}
  >
    <img src={logo} alt="Notes App" className="h-7 w-auto" />
  </div>
);

export const BaseLayout = ({ 
  children, 
  header, 
  showLogoBar = false,
  className = ""
}: BaseLayoutProps) => {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      {showLogoBar && <LogoBar />}
      {header}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export const ResponsiveLayout = ({ 
  children, 
  mobileContent, 
  desktopContent, 
  showLogoBar = false 
}: ResponsiveLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <BaseLayout showLogoBar={showLogoBar && isMobile}>
      {isMobile ? mobileContent : desktopContent}
      {children}
    </BaseLayout>
  );
};
