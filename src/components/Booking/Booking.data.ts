import { Booking } from "../../@types/booking.type";

const FULLNAME_REGEX = /^\s*\p{L}+(?:\s+\p{L}+)+\s*$/u;
const MAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const proveForm = (form: Omit<Booking, "id" | "isConfirmed">) => {
  const fullnameProve = FULLNAME_REGEX.test(form.fullName.trim());
  const emailProve = MAIL_REGEX.test(form.email.trim());

  console.log(fullnameProve, emailProve);

  return fullnameProve && emailProve;
};

export const bookingText = [
  {
    title: "Umówienie wizyty na stronie WPW",
    text: "Zapisz się do nas na wizytę. Wybierz najbardziej pasujący sobie termin i wpisz swoje dane.",
  },
  {
    title: "Booksy",
    text: " Wybierz najbardziej dogodny dzień i godzinę, a my przemienimy tę chwilę w pełną zachwytu podróż do świata piękna i relaksu.",
  },
];

export const bookingTimeExplanation = [
  {
    title: "Wybrana godzina",
    color: "#000",
  },
  {
    title: "Zarezerwowane",
    color: "#e5e7eb",
  },
  {
    title: "Niedostępne",
    color: "#ff6467",
  },
  {
    title: "Kolizja terminów",
    color: "#ffb86a",
  },
];
