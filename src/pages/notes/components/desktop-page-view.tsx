import type { ReactNode } from "react";
import { Outlet } from "react-router";

interface Props {
  heading: string;
  children: ReactNode;
}

const DesktopPageView = ({ heading, children }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <header
        className="flex w-full flex items-center justify-between px-8
            h-[80px] border-b border-(--divider) shrink-0"
      >
        {/* desktop page header */}
        <h1 className="text-preset-1">{heading}</h1>
      </header>
      <div className="flex flex-1 flex-col lg:flex-row">
        <div
          className="w-[290px] h-full
        border-r border-(--divider)
        py-5 pr-4 pl-8 shrink-0
        flex flex-col gap-4 overflow-y-auto"
        >
          {children}
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default DesktopPageView;
