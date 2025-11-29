/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DropdownSelect from "../../@ui/DropdownSelect";
import TimeSelection from "../../@ui/TimeSection/TimeSelection";
import { addBookings } from "../../@api/booking.api";
import classNames from "classnames";
import { proveForm } from "./Booking.data";
import { useNotificationContext } from "../../@context/notificationContent";
import { useServicesContext } from "../../@context/servicesContext";
import loadingImage from "/loading.svg";
import { useMutation } from "@tanstack/react-query";
import { useBookingContext } from "../../@context/bookingContext";
import BookingExplaining from "./BookingExplaining";
import { Booking } from "../../@types/booking.type";
import { useUpdateSearchParams } from "../../@hooks/useUpdateSearchParams.hook";
import dayjs from "dayjs";
import {
  CATEGORY_PARAM,
  SELECTED_DATE_PARAM,
  SERVICE_PARAM,
} from "../../@constants/searchParams";
import { useSearchParamsList } from "../../@hooks/useSearchParamsList.hook";

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
  const updateParam = useUpdateSearchParams();
  const { category: categoryParam, service: serviceParam } =
    useSearchParamsList();

  const [isValidDate, setIsValidDate] = useState(true);

  const [bookingForm, setBookingForm] = useState<
    Omit<Booking, "_id" | "isConfirmed"> & { category: string }
  >({
    fullName: "",
    email: "",
    category: categoryParam ?? categories[0],
    service: serviceParam ?? initialServices[0],
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

  const handleChangeFormOption = (
    name: string,
    newOption: string,
    param?: string,
  ) => {
    setBookingForm((prev) => ({ ...prev, [name]: newOption }));
    if (param) {
      updateParam({
        [param]: newOption,
      });
    }
  };

  const handleChangeDate = (newDate: Date | null) => {
    setBookingForm((prev) => ({ ...prev, date: newDate }));
    updateParam({
      [SELECTED_DATE_PARAM]: dayjs(newDate).toISOString(),
    });
  };

  useEffect(() => {
    if (!categoryParam) {
      updateParam({
        [SERVICE_PARAM]: initialServices[0],
        [CATEGORY_PARAM]: categories[0],
      });
    }
  }, []);

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
    if (!categoryParam) {
      setBookingForm((prev) => ({
        ...prev,
        service: servicesOnCategory(category)[0],
      }));
      updateParam({
        [SERVICE_PARAM]: servicesOnCategory(category)[0],
        [CATEGORY_PARAM]: category,
      });
    }
  }, [categoryParam]);

  const { mutate, isPending: loading } = useMutation({
    mutationFn: (newBooking: Omit<Booking, "_id" | "isConfirmed">) =>
      addBookings(newBooking),
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
          param={CATEGORY_PARAM}
          title="Wybież kategoriję"
          onClickChangeCurrent={handleChangeFormOption}
        />
        <DropdownSelect
          name="service"
          current={service}
          param={SERVICE_PARAM}
          options={servicesOnCategory(category) ?? []}
          title="Wybież usługę"
          onClickChangeCurrent={handleChangeFormOption}
        />
        <DropdownSelect
          name="master"
          current={master}
          options={mastersOnService(service) ?? []}
          onClickChangeCurrent={handleChangeFormOption}
          title="Wybież mistrza"
        />
        <BookingExplaining />

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
              "aspect-4/1 w-44 rounded-xl border",
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
