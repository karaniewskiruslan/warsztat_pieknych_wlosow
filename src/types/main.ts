type Gallery = {
  gallery: string[];
  scrollDirection: "X" | "Y";
};

export type MainContent = {
  title: string;
  content: string;
  gallery1: Gallery;
  gallery2: Gallery;
};
