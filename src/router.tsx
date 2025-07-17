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

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Main /> },
        { path: "admin", element: <Admin /> },
        { path: "masters", element: <Masters /> },
        { path: "masters/:name", element: <Master /> },
        { path: "services", element: <Services /> },
        { path: "booking", element: <Booking /> },
        { path: "contact", element: <Contact /> },
        { path: "*", element: <EmptyPage /> },
      ],
    },
  ],
  {
    basename: "/warsztat_pieknych_wlosow/",
  },
);
