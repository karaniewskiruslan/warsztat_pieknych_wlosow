import { createBrowserRouter } from "react-router";
import Main from "./components/Main/Main";
import Admin from "./components/Admin/Admin";
import Masters from "./components/Masters/Masters";
import Master from "./components/Masters/Master/Master";
import EmptyPage from "./components/EmptyPage/EmptyPage";
import Contact from "./components/Contact/Contact";
import Booking from "./components/Booking/Booking";
import Services from "./components/Services/Services";
import App from "./App";
import AdminPanel from "./components/Admin/AdminPanel/AdminPanel";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: App,
      children: [
        { index: true, Component: Main },
        {
          path: "admin",
          Component: Admin,
          children: [{ path: "panel", Component: AdminPanel }],
        },
        { path: "masters", Component: Masters },
        { path: "masters/:name", Component: Master },
        { path: "services", Component: Services },
        { path: "booking", Component: Booking },
        { path: "contact", Component: Contact },
        { path: "*", Component: EmptyPage },
      ],
    },
  ],
  {
    basename: "/warsztat_pieknych_wlosow/",
  },
);
