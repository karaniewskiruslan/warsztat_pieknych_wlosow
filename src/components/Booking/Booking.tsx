import BookingForm from "./BookingForm";
import booksy from "/img/socials/booksy.svg";

const Booking = () => {
  return (
    <div data-testid="booking" className="space-y-4">
      <h1>Jak do nas się zapisać</h1>
      <section className="space-y-2">
        <hgroup>
          <h2>Na booksy</h2>
          <p>
            Wybierz najbardziej dogodny dzień i godzinę, a my przemienimy tę
            chwilę w pełną zachwytu podróż do świata piękna i relaksu.
          </p>
        </hgroup>
        <a
          data-testid="link_booksy"
          href="https://booksy.com/pl-pl/172573_warsztat-pieknych-wlosow_fryzjer_3_warszawa?do=invite&_branch_match_id=1430280485439261899&utm_medium=merchant_customer_invite&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVz48Mc03yNfGz8EuyrytKTUstKsrMS49PKsovL04tsnXLBIrlVwAAeWwQpz0AAAA%3D"
          target="blank"
          className="flex w-fit items-center gap-1 border-b text-xl font-bold"
        >
          <span>Umów się już teraz</span>
          <img src={booksy} alt="booksy" loading="lazy" className="size-5" />
        </a>
      </section>

      <section className="space-y-2">
        <hgroup>
          <h2>JUŻ WKRÓTCE - Umówienie wizyty na stronie WPW</h2>
          <p>
            Szykują się zmiany na naszej stronie, i wszystko dla twojej wygody!
            Będzie gotowe wkrótce.
          </p>
        </hgroup>
      </section>

      <section className="space-y-2">
        <BookingForm />
      </section>
    </div>
  );
};

export default Booking;
