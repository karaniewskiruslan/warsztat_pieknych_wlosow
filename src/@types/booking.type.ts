export type Booking = {
  _id: string;
  fullName: string;
  email: string;
  service: string;
  master: string;
  date: Date | null;
  last: number;
  isConfirmed: boolean;
};
