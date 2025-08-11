import { useNavigate } from "react-router";
import PageButton from "../../../../UI/PageButton";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../../api/booking.api";
import { useEffect, useState } from "react";
import { Booking } from "../../../../types/booking.type";
import BookingManagementInfo from "./BookingManagementInfo";
import loadingImage from "/loading.svg";

// type Props = {};

const BookingManagement = () => {
  const nav = useNavigate();
  const [bookingList, setBookingList] = useState<Booking[]>([]);

  const handleClickBack = () => {
    nav(-1);
  };

  const { data, error, isPending } = useQuery({
    queryKey: ["booking"],
    queryFn: getBookings,
  });

  useEffect(() => {
    if (data) setBookingList(data);
  }, [data]);

  if (error)
    return (
      <h1>Niestety nie udało się pobrać dane z powodu: {error.toString()}</h1>
    );

  return (
    <section className="relative flex flex-col space-y-4">
      <h2>Zarządzanie wizytami</h2>

      <section className="midpoint:grid-cols-[2fr_3fr] grid gap-4">
        <p>Tutaj masz wszystkie wizytę, umowione poprzez stronę WPW</p>
        <section className="grid gap-2">
          {isPending && (
            <div className="flex size-5">
              <img
                src={loadingImage}
                alt="Ładowanie…"
                loading="lazy"
                className="size-4 animate-spin"
              />
            </div>
          )}

          {!isPending &&
            bookingList.length > 0 &&
            bookingList.map((booking) => (
              <BookingManagementInfo key={booking.id} booking={booking} />
            ))}

          {!isPending && bookingList.length === 0 && (
            <h3>Nie ma umówionych wizyt</h3>
          )}
        </section>
      </section>

      <PageButton text="< Wstecz" onClick={handleClickBack} />
    </section>
  );
};

export default BookingManagement;
