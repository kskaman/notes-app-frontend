import { useLayoutEffect, useState } from "react";

const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    return typeof window !== "undefined"
      ? window.innerWidth < breakpoint
      : false;
  });

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const updateSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
