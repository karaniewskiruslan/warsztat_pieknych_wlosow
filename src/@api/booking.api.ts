import axios from "axios";
import { Booking } from "../@types/booking.type";

const baseUrl = import.meta.env.VITE_API_URL + "api/booking";

export const getBookings = async () => {
  const res = await axios.get<Booking[]>(baseUrl);

  return res.data;
};

export const addBookings = async (
  newBooking: Omit<Booking, "id" | "isConfirmed">,
) => {
  const res = await axios.post<Booking>(baseUrl, newBooking);

  return res.data;
};

export const updateBookings = async (id: string, isConfirmed: boolean) => {
  console.log(id, isConfirmed);

  const res = await axios.put<Booking>(baseUrl + `/${id}`, { isConfirmed });

  return res.data;
};

export const deleteBookings = async (id: string) => {
  const res = await axios.delete<Booking[]>(baseUrl + `/${id}`);

  return res.data;
};
