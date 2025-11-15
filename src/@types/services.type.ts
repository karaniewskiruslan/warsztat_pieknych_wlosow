export type Services = {
  id: number;
  image: string | null;
  name: string;
  options: string[];
  category: string;
  masters: string[];
  last: number;
  cost: number | number[];
};
