import { ChangeEvent, FormEvent, useState } from "react";
import DropdownSelect from "../../UI/DropdownSelect";
import { mastersInfo } from "../Masters/Masters.data";
import TimeSelection from "../../UI/TimeSection/TimeSelection";
import { BookingAPI } from "../../types/booking.type";
import { addBookings } from "../../api/booking.api";
import classNames from "classnames";
import { proveForm } from "./Booking.data";
import { useNotificationContext } from "../../context/notificationContent";

const mastersNames = mastersInfo.map((el) => el.name);

const BookingForm = () => {
  const { addNewNotification } = useNotificationContext();

  const [bookingForm, setBookingForm] = useState<BookingAPI>({
    fullName: "",
    email: "",
    service: "Some placeholder text 1",
    master: mastersNames[0],
    date: null,
  });

  const { fullName, email, service, master, date } = bookingForm;

  const onChangeFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeFormOption = (name: string, newOption: string) => {
    setBookingForm((prev) => ({ ...prev, [name]: newOption }));
  };

  const handleChangeDate = (newDate: Date | null) => {
    setBookingForm((prev) => ({ ...prev, date: newDate }));
  };

  const handleSubmitForm = async () => {
    if (!proveForm(bookingForm))
      return addNewNotification(
        "error",
        "Nieprawidłowe dane",
        "Proszę sprawdzić imię i nazwisko oraz email",
      );

    if (!date)
      return addNewNotification(
        "error",
        "Nieprawidłowe dane",
        "Nie została wybrana data wizyty",
      );

    try {
      await addBookings(bookingForm);

      addNewNotification(
        "added",
        "Wizyta zapisana",
        "Wizyta została wysłana do weryfikacji. Proszę poczekać na potwierdzenie od salonu.",
      );
      setBookingForm({
        fullName: "",
        email: "",
        service: "Some placeholder text 1",
        master: mastersNames[0],
        date: null,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmitForm();
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="mobile:grid-cols-2 grid gap-4"
      >
        <label>
          <p className="font-bold">Imię i nazwisko</p>
          <input
            type="text"
            value={fullName}
            onChange={onChangeFormInput}
            name="fullName"
          />
        </label>
        <label>
          <p className="font-bold">Email</p>
          <input
            type="text"
            value={email}
            onChange={onChangeFormInput}
            name="email"
          />
        </label>
        <DropdownSelect
          name="service"
          current={service}
          options={[
            "Some placeholder text 1",
            "Some placeholder text 2",
            "Some placeholder text 3",
            "Some placeholder text 4",
            "Some placeholder text 5",
            "Some placeholder text 6",
            "Some placeholder text 7",
            "Some placeholder text 8",
            "Some placeholder text 9",
          ]}
          title="Wybież usługę"
          onClickChangeCurrent={onChangeFormOption}
        />
        <DropdownSelect
          name="master"
          current={master}
          options={mastersNames}
          onClickChangeCurrent={onChangeFormOption}
          title="Wybież mistrza"
        />
        <TimeSelection onChangeDate={handleChangeDate} />
        <div className="mobile:col-span-2 grid place-items-center">
          <button
            type="submit"
            className={classNames(
              "px-4 py-2",
              "rounded-xl border",
              "duration-150 hover:bg-black hover:text-white",
            )}
          >
            Zarezerwuj wizytę
          </button>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
