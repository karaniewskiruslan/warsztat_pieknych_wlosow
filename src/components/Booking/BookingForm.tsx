import { ChangeEvent, FormEvent, useState } from "react";
import DropdownSelect from "../../UI/DropdownSelect";
import { mastersInfo } from "../Masters/Masters.data";
import TimeSelection from "../../UI/TimeSection/TimeSelection";
import { BookingAPI } from "../../types/booking.type";
import { addBookings } from "../../api/booking.api";
import classNames from "classnames";
import { proveForm } from "./Booking.data";

const mastersNames = mastersInfo.map((el) => el.name);

const BookingForm = () => {
  const [bookingForm, setBookingForm] = useState<BookingAPI>({
    fullName: "",
    email: "",
    service: "Some placeholder text 1",
    master: mastersNames[0],
    date: new Date(),
  });

  const { fullName, email, service, master } = bookingForm;

  const onChangeFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeFormOption = (name: string, newOption: string) => {
    setBookingForm((prev) => ({ ...prev, [name]: newOption }));
  };

  const handleChangeDate = (newDate: Date) => {
    setBookingForm((prev) => ({ ...prev, date: newDate }));
  };

  const handleSubmitForm = async () => {
    if (!proveForm(bookingForm)) return;

    try {
      await addBookings(bookingForm);

      setBookingForm({
        fullName: "",
        email: "",
        service: "Some placeholder text 1",
        master: mastersNames[0],
        date: new Date(),
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
            required
          />
        </label>
        <label>
          <p className="font-bold">Email</p>
          <input
            type="text"
            value={email}
            onChange={onChangeFormInput}
            name="email"
            required
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
