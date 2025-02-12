import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Masters from "./components/Masters/Masters";
import Portfolio from "./components/Portfolio/Portfolio";
import Booking from "./components/Booking/Booking";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl px-15 py-10 font-poppins">
        <Routes>
          <Route index path="/" element={<Main />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
