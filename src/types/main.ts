type Gallery = {
  gallery: string[];
  pagination: number;
  scrollDirection: "X" | "Y";
  delay: number;
};

export type MainContent = {
  title: string;
  content: string;
  gallery1: Gallery;
  gallery2: Gallery;
};
