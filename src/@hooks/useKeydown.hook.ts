import { useEffect } from "react";

export const useKeydown = (
  key: string,
  action: () => void,
  condition?: boolean,
) => {
  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (
        e.key.toLocaleLowerCase() === key.toLocaleLowerCase() &&
        (condition ?? true)
      ) {
        action();
      }
    };

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [action, key, condition]);
};
