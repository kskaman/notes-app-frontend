import type { ReactNode } from "react";
import MobileTopBar from "./mobile-top-bar";
import useIsMobile from "../../../hooks/useIsMobile";

interface Props {
  heading: string;
  subHeading?: string | null;
  children?: ReactNode;
}

const SettingsSubLayout = ({ heading, subHeading = null, children }: Props) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile && <MobileTopBar />}
      <div
        className="flex flex-col gap-4
      overflow-y-auto h-full w-full lg:max-w-[600px] py-6 px-8"
      >
        {/* heading and subheading */}

        <div className="flex flex-col gap-1">
          <h2 className="text-preset-3">{heading}</h2>

          <h5 className="text-preset-5 text-(--subheading-text-2)">
            {subHeading}
          </h5>
        </div>

        {children}
      </div>
    </>
  );
};

export default SettingsSubLayout;
