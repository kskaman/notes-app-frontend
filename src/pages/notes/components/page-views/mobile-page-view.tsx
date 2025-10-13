import type { ReactNode } from "react";
import MobileHeader from "../page-headers/mobile-header";

interface Props {
  heading: string;
  children: ReactNode;
}

const MobilePageView = ({ heading, children }: Props) => {
  return (
    <>
      {/* mobile + tablet logo bar + page header */}
      <MobileHeader heading={heading} />
      <div className="h-full w-full flex flex-col py-6 px-8 gap-4">
        {children}
      </div>
    </>
  );
};

export default MobilePageView;
