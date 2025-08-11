import classNames from "classnames";
import { Booking } from "../../../../types/booking.type";
import { dataText } from "./BookingManagement.data";
import Expand from "/Expand.svg";
import { useState } from "react";
import CategoryText from "../../../../UI/CategoryText";

type Props = {
  booking: Booking;
};

const BookingManagementInfo = ({ booking }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const { id, fullName, isConfirmed, date, service, master, email } = booking;

  const infoArray = [
    ["Usługa", service],
    ["Wybrany mistrz", master],
    ["Email", email],
  ];

  return (
    <>
      <section className="rounded-3xl border-2 px-4 py-2">
        <div className="flex justify-between">
          <section className="flex items-center gap-2">
            <div
              className={classNames(
                "size-4 rounded-full",
                { "bg-yellow-400": !isConfirmed },
                { "bg-lime-400": isConfirmed },
              )}
            ></div>
            <p className={classNames("duration-150", { "opacity-0": isOpen })}>
              {fullName}
            </p>
          </section>
          <section className="flex items-center gap-2">
            <p>{dataText(new Date(date))}</p>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="size-7 rounded-full border"
            >
              <img
                src={Expand}
                alt="expand"
                className={classNames("duration-150", {
                  "-rotate-180": isOpen,
                })}
              />
            </button>
          </section>
        </div>
        <div
          className={classNames(
            "grid duration-150",
            { "grid-rows-[0fr]": !isOpen },
            { "grid-rows-[1fr]": isOpen },
          )}
        >
          <section className="space-y-4 overflow-hidden">
            <hgroup>
              <h3>
                Wizyta <span className="uppercase">{fullName}</span>
              </h3>
              <article className="flex justify-between">
                <CategoryText category="ID wizyty" body={id.slice(0, 8)} />
                <CategoryText
                  category="Status"
                  body={isConfirmed ? "Potwierdzona" : "Oczekuje"}
                />
              </article>
            </hgroup>
            <article>
              {infoArray.map(([category, body], i) => (
                <CategoryText key={i} category={category} body={body} />
              ))}
            </article>
            <section className="grid grid-cols-3 gap-2">
              <button type="button" className="bookingButton">
                Potwierdź
              </button>
              <button type="button" className="bookingButton">
                Zmień
              </button>
              <button type="button" className="bookingButton">
                Usuń
              </button>
            </section>
          </section>
        </div>
      </section>
    </>
  );
};

export default BookingManagementInfo;
