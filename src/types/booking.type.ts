export type BookingAPI = {
  fullName: string;
  email: string;
  service: string;
  master: string;
  date: Date;
};

export type Booking = {
  id: string;
  fullName: string;
  email: string;
  service: string;
  master: string;
  date: Date;
  isConfirmed: boolean;
};
