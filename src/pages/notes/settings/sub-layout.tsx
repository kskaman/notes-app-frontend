import type { ReactNode } from "react";

interface Props {
  heading: string;
  subHeading?: string | null;
  children?: ReactNode;
}

const SettingsSubLayout = ({ heading, subHeading = null, children }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {/* heading and subheading */}

      <div className="flex flex-col gap-1">
        <h2 className="text-preset-3">{heading}</h2>

        <h5 className="text-preset-5 text-(--subheading-text-2)">
          {subHeading}
        </h5>
      </div>

      {children}
    </div>
  );
};

export default SettingsSubLayout;
