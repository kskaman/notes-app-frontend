import type { ReactNode } from "react";

const InfoText = ({ children }: { children: ReactNode }) => {
  return (
    <p className="p-2 rounded-[8px] bg-(--info-text-bg-1) text-preset-5">
      {children}
    </p>
  );
};

export default InfoText;
