import { useEffect, useState } from "react";

const getPageHeight = () => {
  const { body, documentElement } = document;
  return Math.max(
    body.scrollHeight,
    documentElement.scrollHeight,
    body.offsetHeight,
    documentElement.offsetHeight,
    body.clientHeight,
    documentElement.clientHeight,
  );
};

const usePageHeight = () => {
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const checkFit = () => {
      const viewportH = window.innerHeight;
      const pageH = getPageHeight();
      setFits(pageH === viewportH);
    };

    checkFit();

    window.addEventListener("resize", checkFit);
    return () => window.removeEventListener("resize", checkFit);
  });

  return { fits };
};

export default usePageHeight;
