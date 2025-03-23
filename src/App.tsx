import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Masters from "./components/Masters/Masters";
import Services from "./components/Services/Services";
import Booking from "./components/Booking/Booking";
import Contact from "./components/Contact/Contact";
import EmptyPage from "./components/EmptyPage/EmptyPage";

function App() {
  return (
    <>
      <Header />
      <main className="font-poppins mx-auto w-full max-w-7xl px-15 py-12">
        <Routes>
          <Route index path="/" element={<Main />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
