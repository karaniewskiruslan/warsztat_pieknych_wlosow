import { BookingAPI } from "../../types/booking.type";

const FULLNAME_REGEX = /^\s*\p{L}+(?:\s+\p{L}+)+\s*$/u;
const MAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const proveForm = (form: BookingAPI) => {
  const fullnameProve = FULLNAME_REGEX.test(form.fullName.trim());
  const emailProve = MAIL_REGEX.test(form.email.trim());

  console.log(fullnameProve, emailProve);

  return fullnameProve && emailProve;
};

