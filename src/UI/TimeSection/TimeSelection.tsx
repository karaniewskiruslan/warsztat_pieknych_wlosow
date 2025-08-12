import classNames from "classnames";
import { Value } from "react-calendar/dist/shared/types.js";
import TimeSelectionCalendar from "./TimeSelectionCalendar";
import { useEffect, useState } from "react";

type Props = {
  onChangeDate: (newDate: Date | null) => void;
};

const newTimes = (date: Date) => {
  const timeArray = [];
  const today = new Date();
  const currentMinutes = today.getMinutes();
  const currentHour = date.getHours();
  const isToday =
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate();
  const hourProve = isToday
    ? Math.max(today.getHours() + 2, 9)
    : Math.max(currentHour + 2, 9);

  for (let h = hourProve; h < 20; h++) {
    for (
      let m =
        h === hourProve && isToday ? Math.ceil(currentMinutes / 15) * 15 : 0;
      m < 60;
      m += 15
    ) {
      timeArray.push(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      );
    }
  }

  return timeArray;
};

const dataChange = (date: Date, h: number, m: number) => {
  const newDate = new Date(date);
  newDate.setHours(h);
  newDate.setMinutes(m);

  return newDate;
};

const TimeSelection = ({ onChangeDate }: Props) => {
  const dayToday = new Date();
  const [timeArray, setTimeArray] = useState<string[]>(newTimes(dayToday));

  const initialBookTimeTime = () => {
    let firstAvailableTime: string | undefined;

    if (timeArray.length > 0) {
      firstAvailableTime = timeArray[0];
    } else {
      const tomorrowTimes = newTimes(
        new Date(new Date().setDate(dayToday.getDate() + 1)),
      );
      firstAvailableTime = tomorrowTimes[0];
    }

    if (!firstAvailableTime) {
      // No available time today or tomorrow — return "now" or a safe fallback
      return new Date(dayToday);
    }

    const [h, m] = firstAvailableTime.split(":").map(Number);

    const date = new Date(dayToday);
    date.setHours(h, m, 0, 0);

    return date;
  };

  const [bookTime, setBookTime] = useState<Date>(initialBookTimeTime());

  useEffect(() => {
    onChangeDate(null);
  }, []);

  const handleClickDate = (e: Value) => {
    const newDate = new Date(e as Date);

    if (newDate.setHours(0, 0, 0, 0) < dayToday.setHours(0, 0, 0, 0)) return;

    const newArray = newTimes(newDate);
    const [h, m] = newArray[0].split(":").map(Number);
    setTimeArray(newArray);

    setBookTime(dataChange(newDate, h, m));
  };

  const handleClickBookClock = (time: string) => {
    const [h, m] = time.split(":").map(Number);

    setBookTime((prev) => dataChange(prev, h, m));
  };

  useEffect(() => {
    onChangeDate(bookTime);
  }, [bookTime]);

  return (
    <section className="mobile:col-span-2 space-y-2">
      <p className="font-bold">Wybież czas i datę</p>
      <section
        className={classNames("grid gap-2", {
          "tablet:grid-cols-10 midpoint:grid-cols-8 mobile:grid-cols-6 grid-cols-4":
            timeArray.length,
        })}
      >
        {timeArray.length ? (
          timeArray.map((t, i) => {
            const timeText = `${String(bookTime.getHours()).padStart(2, "0")}:${String(bookTime.getMinutes()).padStart(2, "0")}`;

            return (
              <article
                key={i}
                onClick={() => handleClickBookClock(t)}
                className={classNames(
                  "cursor-pointer rounded-full border px-4 py-1 text-center",
                  {
                    "bg-black text-white": t === timeText,
                  },
                )}
              >
                {t}
              </article>
            );
          })
        ) : (
          <p>Nie ma terminów w dany dzień</p>
        )}
      </section>
      <section>
        <TimeSelectionCalendar
          currentChoice={bookTime}
          onClick={handleClickDate}
        />
      </section>
    </section>
  );
};

export default TimeSelection;
