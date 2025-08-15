export type BookingAPI = {
  fullName: string;
  email: string;
  service: string;
  master: string;
  date: Date | null;
  last: number;
};

export type Booking = {
  id: string;
  fullName: string;
  email: string;
  service: string;
  master: string;
  date: Date;
  last: number;
  isConfirmed: boolean;
};
