import { useState, useEffect } from "react";

export const useCurrentWidth = (currentWidth?: number) => {
  const [windowWidth, setWindowWidth] = useState<number>(
    currentWidth ?? window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { windowWidth };
};
