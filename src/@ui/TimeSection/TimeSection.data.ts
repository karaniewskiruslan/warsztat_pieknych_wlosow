export const timeString = (h: number, m: number) => {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const newTimes = (date: Date) => {
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

  for (let h = hourProve; h < 21; h++) {
    for (
      let m =
        h === hourProve && isToday ? Math.ceil(currentMinutes / 15) * 15 : 0;
      m < 60;
      m += 15
    ) {
      timeArray.push(timeString(h, m));
    }
  }

  return timeArray;
};

export const dataChange = (date: Date, h: number, m: number) => {
  const newDate = new Date(date);
  newDate.setHours(h, m, 0, 0);

  return newDate;
};

export const dateAvailable = (date: Date, last: number) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let prover = last;
  const neededTime = [];

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
