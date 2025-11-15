/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Booking } from "../@types/booking.type";
import { getBookings } from "../@api/booking.api";

type Props = {
  children: ReactNode;
};

const useBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBooking, setLoadingBooking] = useState<boolean>(true);
  const [errorBooking, setErrorBooking] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchBookings = async () => {
      try {
        setLoadingBooking(true);
        const data = await getBookings();
        if (mounted) {
          setBookings(
            [...data].sort(
              (a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime(),
            ),
          );
          setErrorBooking(null);
        }
      } catch (err) {
        if (mounted) setErrorBooking(err as Error);
      } finally {
        if (mounted) setLoadingBooking(false);
      }
    };

    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const addBookingToCache = (newBooking: Booking) => {
    if (!newBooking) return;
    setBookings((prev) => [...prev, newBooking]);
  };

  const updateBookingInCache = (updated: Booking) => {
    if (!updated) return;
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const deleteBookingFromCache = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const sortedBookings = useMemo(
    () =>
      [...bookings].sort(
        (a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime(),
      ),
    [bookings],
  );

  return {
    bookings: sortedBookings,
    loadingBooking,
    errorBooking,
    addBookingToCache,
    updateBookingInCache,
    deleteBookingFromCache,
  };
};

type BookingsContentProps = ReturnType<typeof useBooking>;

const BookingContext = createContext({} as BookingsContentProps);

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) throw new Error("Context must be used within ServicesContext");

  return context;
};

export const BookingContextContainer = ({ children }: Props) => {
  const value = useBooking();

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
