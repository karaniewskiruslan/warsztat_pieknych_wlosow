import { bookingTimeExplanation } from "./Booking.data";
import BookingExplainingItem from "./BookingExplainingItem";

const BookingExplaining = () => {
  return (
    <section className="midpoint:grid-cols-4 mobile:grid-cols-2 mobile:col-span-2 grid gap-2">
      {bookingTimeExplanation.map((item) => (
        <BookingExplainingItem key={item.title} item={item} />
      ))}
    </section>
  );
};

export default BookingExplaining;
