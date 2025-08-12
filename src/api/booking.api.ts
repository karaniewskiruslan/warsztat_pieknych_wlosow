import { BookingAPI } from "../types/booking.type";

const baseUrl = "http://localhost:5000/api/booking";

export const getBookings = async () => {
  const res = await fetch(baseUrl, {
    method: "GET",
  });

  const data = await res.json();

  return data;
};

export const addBookings = async (newBooking: BookingAPI) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBooking),
  });

  const data = await res.json();

  return data;
};

export const updateBookings = async (id: string, isConfirmed: boolean) => {
  const res = await fetch(baseUrl + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isConfirmed }),
  });

  const data = await res.json();

  console.log(data);

  return data;
};

export const deleteBookings = async (id: string) => {
  const res = await fetch(baseUrl + `/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  return data;
};
