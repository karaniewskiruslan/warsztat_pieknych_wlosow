import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

export const useUpdateSearchParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (params: Record<string, string | undefined | null>) => {
      const currentParams = new URLSearchParams(location.search);

      Object.entries(params).forEach(([key, value]) => {
        if (value != null && value !== "") {
          currentParams.set(key, value);
        } else {
          currentParams.delete(key);
        }
      });

      const queryString = currentParams.toString();
      const newPath = queryString
        ? `${location.pathname}?${queryString}`
        : location.pathname;

      navigate(newPath, { replace: true });
    },
    [location, navigate],
  );
};
