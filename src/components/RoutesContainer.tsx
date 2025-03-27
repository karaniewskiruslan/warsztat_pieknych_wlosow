import { Route, Routes } from "react-router";
import Main from "./Main/Main";
import Masters from "./Masters/Masters";
import Services from "./Services/Services";
import Booking from "./Booking/Booking";
import Contact from "./Contact/Contact";
import EmptyPage from "./EmptyPage/EmptyPage";

const RoutesContainer = () => {
  return (
    <main className="font-poppins tablet:px-15 mx-auto w-full max-w-7xl px-8 py-12">
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route path="/masters" element={<Masters />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<EmptyPage />} />
      </Routes>
    </main>
  );
};

export default RoutesContainer;
