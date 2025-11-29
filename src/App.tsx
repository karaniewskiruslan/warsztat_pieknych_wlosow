import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { lazy, Suspense, useEffect, useRef } from "react";
import Loading from "./components/Loading.tsx";
import { motion, useScroll } from "motion/react";
import usePageHeight from "./@hooks/usePageHeight.hook.ts";
import { useLocation } from "react-router";
import { useBookingContext } from "./@context/bookingContext.tsx";
import { useNotificationContext } from "./@context/notificationContent.tsx";
import Notifications from "./@ui/Notifications/Notifications.tsx";

const Layout = lazy(() => import("./components/Layout.tsx"));

function App() {
  const { scrollYProgress } = useScroll();
  const { bookings } = useBookingContext();
  const { addNewNotification } = useNotificationContext();
  const fits = usePageHeight();
  const { pathname } = useLocation();
  const prevLengthRef = useRef<number>(0);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (prevLengthRef.current === 0) {
      prevLengthRef.current = bookings.length;
    }

    if (!token || !bookings) {
      return;
    }

    if (bookings.length > prevLengthRef.current) {
      addNewNotification(
        "added",
        "Nowe umowienie wizyty",
        "Masz nową wizytę do salonu. Sprawdź swoje zarządzanie wizytami.",
      );
    }

    prevLengthRef.current = bookings.length;
  }, [bookings, addNewNotification]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {fits && (
        <motion.div
          data-testid="scroll-progress-bar"
          className="fixed top-0 left-0 z-30 h-1 w-full bg-gray-200"
          style={{
            scaleX: scrollYProgress,
            originX: 0,
          }}
          transition={{ duration: 0.2 }}
        />
      )}

      <Header />
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
      <Notifications />
      <Footer />
    </>
  );
}

export default App;
