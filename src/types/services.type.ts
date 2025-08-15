export type Services = {
  id: number;
  image: string;
  name: string;
  options: string[];
  category: string;
  masters: string[];
  last: number;
  cost: number | number[];
};

export type ServicesAPI = {
  image: File | null;
  name: string;
  options: string[];
  category: string;
  masters: string[];
  last: number;
  cost: number | number[];
};
