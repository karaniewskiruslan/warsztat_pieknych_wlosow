import dayjs from "dayjs";
import { SELECTED_DATE_PARAMS } from "../../@constants/searchParams";
import { appUrls, toLink } from "../../appUrls";

export const menuOptions = [
  {
    title: "Główna",
    to: { pathname: toLink(appUrls.ROOT), search: undefined },
  },
  {
    title: "Mistrzowie",
    to: { pathname: toLink(appUrls.MASTERS), search: undefined },
  },
  {
    title: "Usługi",
    to: { pathname: toLink(appUrls.SERVICES), search: undefined },
  },
  {
    title: "Zapisać się",
    to: {
      pathname: toLink(appUrls.BOOKING),
      search: `${SELECTED_DATE_PARAMS}=${dayjs().toISOString()}`,
    },
  },
  {
    title: "Kontakt",
    to: { pathname: toLink(appUrls.CONTACT), search: undefined },
  },
];
