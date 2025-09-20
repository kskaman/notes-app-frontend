import type { ReactNode } from "react";
import logo from "../../../assets/logo.svg";

interface Props {
  heading: string;
  children: ReactNode;
}

const MobilePageView = ({ heading, children }: Props) => {
  return (
    <>
      {/* mobile + tablet logo bar + page header */}
      <div className="overflow-y-auto">
        <div
          className="w-full h-[54px] md:h-[74px]
            flex items-center justify-start
            px-4 md:px-8 bg-(--logo-bar-background)"
        >
          <img src={logo} alt="logo" className="h-7 w-auto" />
        </div>
        <header
          className="flex lg:hidden w-full flex items-center justify-between px-8
          md:h-[29px] mt-5 md:mt-6 mb-4"
        >
          {/* desktop page header */}
          <h1 className="text-preset-1">{heading}</h1>
        </header>
      </div>
      <div className="h-full w-full flex flex-col py-6 px-8 gap-4">
        {children}
      </div>
    </>
  );
};

export default MobilePageView;
