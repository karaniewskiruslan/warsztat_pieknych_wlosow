import dayjs, { Dayjs } from "dayjs";

export const timeString = (h: number, m: number) => {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const newTimes = (date: Dayjs): string[] => {
  const timeArray: string[] = [];
  const now = dayjs();

  const isToday =
    now.year() === date.year() &&
    now.month() === date.month() &&
    now.date() === date.date();

  const startHour = isToday ? Math.max(now.hour() + 2, 9) : 9;

  for (let h = startHour; h < 21; h++) {
    let startMinute = 0;

    if (isToday && h === startHour) {
      const rounded = Math.ceil(now.minute() / 15) * 15;
      startMinute = rounded < 60 ? rounded : 0;
    }

    for (let m = startMinute; m < 60; m += 15) {
      timeArray.push(timeString(h, m));
    }
  }

  return timeArray;
};

export const dataChange = (date: Dayjs, h: number, m: number): Dayjs => {
  return date.hour(h).minute(m).second(0).millisecond(0);
};

export const dateAvailable = (date: Dayjs, last: number): string[] => {
  let hours = date.hour();
  let minutes = date.minute();
  let prover = last;
  const neededTime: string[] = [];

  while (prover > 0) {
    minutes += 15;
    if (minutes >= 60) {
      minutes -= 60;
      hours = (hours + 1) % 24;
    }
    neededTime.push(timeString(hours, minutes));
    prover--;
  }

  return neededTime;
};
