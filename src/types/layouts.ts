import type { ReactNode } from "react";

// Base layout props
export interface BaseLayoutProps {
  children?: ReactNode;
  className?: string;
  showLogoBar?: boolean;
  header?: ReactNode;
}

// Logo bar props
export interface LogoBarProps {
  className?: string;
}

// Responsive layout props  
export interface ResponsiveLayoutProps {
  children?: ReactNode;
  className?: string;
  mobileContent: ReactNode;
  desktopContent: ReactNode;
  showLogoBar?: boolean;
}

// Standard page layout props
export interface StandardPageLayoutProps {
  heading: string;
  children?: ReactNode;
  variant?: "main" | "sub";
  rootPath?: string;
}

// Settings sub-layout props
export interface SettingsSubLayoutProps {
  heading: string;
  subHeading?: string | null;
  children?: ReactNode;
}

// Mobile header props
export interface MobileHeaderProps {
  heading: string;
  showBack?: boolean;
  onBack?: () => void;
}

// Desktop header props
export interface DesktopHeaderProps {
  heading: string;
  actions?: ReactNode;
}

// Sidebar props
export interface SidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

// Bottom navbar props
export interface BottomNavbarProps {
  className?: string;
}
