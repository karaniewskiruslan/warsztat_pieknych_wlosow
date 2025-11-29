export type Services = {
  _id: number;
  image: string | null;
  name: string;
  category: string;
  last: number;
  options: string[];
  masters: string[];
  cost: number | number[];
};
