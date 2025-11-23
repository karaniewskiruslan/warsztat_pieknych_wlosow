import { useMemo } from "react";
import {
  CATEGORY_PARAM,
  SELECTED_DATE_PARAMS,
  SERVICE_PARAM,
} from "../@constants/searchParams";
import { useSearchParams } from "react-router";

export const useSearchParamsList = () => {
  const [searchParam] = useSearchParams();

  const params = useMemo(
    () => ({
      [SELECTED_DATE_PARAMS]: searchParam.get(SELECTED_DATE_PARAMS),
      [CATEGORY_PARAM]: searchParam.get(CATEGORY_PARAM),
      [SERVICE_PARAM]: searchParam.get(SERVICE_PARAM),
    }),
    [searchParam],
  );

  return params;
};
