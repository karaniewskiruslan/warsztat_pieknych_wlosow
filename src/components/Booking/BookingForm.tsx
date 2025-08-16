/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DropdownSelect from "../../UI/DropdownSelect";
import TimeSelection from "../../UI/TimeSection/TimeSelection";
import { Booking, BookingAPI } from "../../types/booking.type";
import { addBookings } from "../../api/booking.api";
import classNames from "classnames";
import { proveForm } from "./Booking.data";
import { useNotificationContext } from "../../context/notificationContent";
import { useServicesContext } from "../../context/servicesContext";
import loadingImage from "/loading.svg";
import { useMutation } from "@tanstack/react-query";
import { useBookingContext } from "../../context/bookingContext";

const BookingForm = () => {
  const {
    services,
    categories,
    servicesOnCategory,
    mastersOnService,
    loadingServices,
  } = useServicesContext();
  const { addNewNotification } = useNotificationContext();
  const { addBookingToCache } = useBookingContext();
  const initialServices = servicesOnCategory(categories[0]);
  const initialService = services.find((el) => el.name === initialServices[0]);

  const [isValidDate, setIsValidDate] = useState(true);

  const [bookingForm, setBookingForm] = useState<
    BookingAPI & { category: string }
  >({
    fullName: "",
    email: "",
    category: categories[0],
    service: initialServices[0],
    last: initialService?.last ?? 0,
    master: initialService?.masters[0] ?? "",
    date: null,
  });

  const { fullName, email, category, service, master, date, last } =
    bookingForm;

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

  useEffect(() => {
    const found = services.find((el) => el.name === service);

    if (found) {
      setBookingForm((prev) => ({
        ...prev,
        last: found.last,
        master: found.masters[0] || prev.master || "",
      }));
    }
  }, [service, services]);

  useEffect(() => {
    setBookingForm((prev) => ({
      ...prev,
      category: categories[0],
    }));
  }, [categories]);

  useEffect(() => {
    setBookingForm((prev) => ({
      ...prev,
      service: servicesOnCategory(category)[0],
    }));
  }, [category]);

  const { mutate, isPending: loading } = useMutation({
    mutationFn: (newBooking: BookingAPI) => addBookings(newBooking),
    onSuccess: (update: Booking) => {
      addBookingToCache(update);
      addNewNotification(
        "added",
        "Wizyta zapisana",
        "Wizyta została wysłana do weryfikacji. Proszę poczekać na potwierdzenie od salonu.",
      );
      setBookingForm({
        fullName: "",
        email: "",
        category: categories[0],
        service: servicesOnCategory(categories[0])[0],
        last: 0,
        master: "",
        date: null,
      });
    },
    onError: (e) => {
      console.error(e);
      addNewNotification(
        "error",
        "Wystąpił błąd",
        "Coś poszło nie tak. Spróbuj jeszcze raz",
      );
    },
  });

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    if (!isValidDate)
      return addNewNotification(
        "error",
        "Nieprawidłowe dane",
        "Ustawiony przez ciebie czas będzie się nakładał na inną wizytę. Wybierz troczę inny czas.",
      );

    const found = services.find((el) => el.name === service);
    const lastValue = found ? found.last : 0;

    mutate({ fullName, email, service, master, last: lastValue, date });
  };

  const handleChangesValidDate = (
    fullTime: string[],
    timeService: string[],
  ) => {
    setIsValidDate(timeService.every((time) => fullTime.includes(time)));
  };

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        className={classNames("mobile:grid-cols-2 grid gap-4", {
          "pointer-events-none opacity-50": loadingServices,
        })}
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
          name="category"
          current={category}
          options={categories}
          title="Wybież kategoriję"
          onClickChangeCurrent={onChangeFormOption}
        />
        <DropdownSelect
          name="service"
          current={service}
          options={servicesOnCategory(category)}
          title="Wybież usługę"
          onClickChangeCurrent={onChangeFormOption}
        />
        <DropdownSelect
          name="master"
          current={master}
          options={mastersOnService(service)}
          onClickChangeCurrent={onChangeFormOption}
          title="Wybież mistrza"
        />
        <TimeSelection
          last={last}
          master={master}
          onChangesValidDate={handleChangesValidDate}
          onChangeDate={handleChangeDate}
        />
        <div className="mobile:col-span-2 grid place-items-center">
          <button
            type="submit"
            className={classNames(
              "grid place-items-center px-4 py-2",
              "aspect-[4/1] w-44 rounded-xl border",
              "duration-150 hover:bg-black hover:text-white",
              { "cursor-not-allowed": loading },
            )}
          >
            {loading ? (
              <>
                <img
                  src={loadingImage}
                  alt="Loading"
                  loading="lazy"
                  className="size-4 animate-spin"
                />
              </>
            ) : (
              "Zarezerwuj wizytę"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
