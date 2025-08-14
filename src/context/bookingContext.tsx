/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Booking } from "../types/booking.type";
import { getBookings } from "../api/booking.api";

type Props = {
  children: ReactNode;
};

type BookingsContentProps = {
  bookings: Booking[];
  loadingBooking: boolean;
  errorBooking: Error | null;
  addBookingToCache: (newBooking: Booking) => void;
  updateBookingInCache: (updated: Booking) => void;
  deleteBookingFromCache: (id: string) => void;
};

const BookingContext = createContext({} as BookingsContentProps);

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) throw new Error("Context must be used within ServicesContext");

  return context;
};

export const BookingContextContainer = ({ children }: Props) => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: getBookings,
    refetchInterval: 5000,
  });

  const bookings = useMemo(
    () =>
      [...data].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    [data],
  );

  const addBookingToCache = (newBooking: Booking) => {
    if (!newBooking) return;

    queryClient.setQueryData<Booking[]>(["booking"], (old = []) => [
      ...old,
      newBooking,
    ]);
  };

  const updateBookingInCache = (updated: Booking) => {
    if (!updated) return;

    queryClient.setQueryData<Booking[]>(["booking"], (old = []) =>
      old.map((b) => (b.id === updated.id ? updated : b)),
    );
  };

  const deleteBookingFromCache = (id: string) => {
    queryClient.setQueryData<Booking[]>(["booking"], (old = []) =>
      old.filter((b) => b.id !== id),
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loadingBooking: isPending,
        errorBooking: error,
        addBookingToCache,
        updateBookingInCache,
        deleteBookingFromCache,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
