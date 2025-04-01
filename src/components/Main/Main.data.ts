import { MainContent } from "../../types/main";

const galleryPhotos1 = [
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFirst/001.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFirst/002.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFirst/003.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFirst/004.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFirst/005.webp",
];

const galleryPhotos2 = [
  "/warsztat_pieknych_wlosow/img/galleryWorks/gallerySecond/001.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/gallerySecond/002.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/gallerySecond/003.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/gallerySecond/004.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/gallerySecond/005.webp",
];

const galleryPhotos3 = [
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryThird/001.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryThird/002.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryThird/003.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryThird/004.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryThird/005.webp",
];

const galleryPhotos4 = [
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFourth/001.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFourth/002.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFourth/003.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFourth/004.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFourth/005.webp",
];

const galleryPhotos5 = [
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFifth/001.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFifth/002.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFifth/003.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFifth/004.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/galleryFifth/005.webp",
];

const galleryPhotos6 = [
  "/warsztat_pieknych_wlosow/img/galleryWorks/gallerySixth/001.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/gallerySixth/002.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/gallerySixth/003.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/gallerySixth/004.webp",
  "/warsztat_pieknych_wlosow/img/galleryWorks/gallerySixth/005.webp",
];

export const mainContent: MainContent[] = [
  {
    title: "Miejsce, gdzie poczujesz się w pewni zadbaną i piękną",
    content:
      "Zdrowe i zadbane włosy to nie tylko sprawa estetyczna, ale także symbol ogólnego stanu organizmu. Zabiegana regularnie pielęgnacja dostosowana do typu włosów zapobiega ich osłabaniu, wypadaniu oraz rozdwajaniu końcówek. Poprawne nawilżanie, ochrona przed wysoką temperaturą oraz zrównoważona dieta bogata w witaminy i minerały wspierają ich siłę i blask. Pamiętaj, że zdrowe włosy są wynikiem codziennej troski i dobrej obsady kosmetyków!",
    gallery1: {
      gallery: galleryPhotos1,
      pagination: 1,
      scrollDirection: "X",
      delay: 0,
    },
    gallery2: {
      gallery: galleryPhotos2,
      pagination: -2,
      scrollDirection: "Y",
      delay: 6000,
    },
  },
  {
    title:
      "Nie chcesz oddawać włosy niewiadomo komu? Jesteś w potrzebnym Ci miejscu",
    content:
      "W Warsztacie Pięknych Włosów dbamy o to, aby każda wizyta była wyjątkowym doświadczeniem. Mistrz włosów Natalia z 30-letnim doświadczeniem w branży fryzjerskiej, z pasją i zaangażowaniem, zawsze służy profesjonalnym doradztwem i pomocą w doborze odpowiednich zabiegów pielęgnacyjnych.",
    gallery1: {
      gallery: galleryPhotos3,
      pagination: 2,
      scrollDirection: "Y",
      delay: 12000,
    },
    gallery2: {
      gallery: galleryPhotos4,
      pagination: -1,
      scrollDirection: "X",
      delay: 18000,
    },
  },
  {
    title: "Nie tylko włosy",
    content:
      "Oprócz usług fryzjerskich także proponujemy manicure i pedicure. Waleria, master z doświadczeniem 15 lat zostawia naszych klientów z pozytywnym humorem i używa nowoczesne materiały, dlatego wasze paznokcie będą wyróżniać Ci dłużej, niż jesteś w stanie sobie wyobrazić. Także możesz skorzystać z usługi terapii światłem, dostarczająca niezbędne elementy do skóry twarza i zapewnia efekt omłodzenia.",
    gallery1: {
      gallery: galleryPhotos5,
      pagination: 4,
      scrollDirection: "X",
      delay: 24000,
    },
    gallery2: {
      gallery: galleryPhotos6,
      pagination: -1,
      scrollDirection: "Y",
      delay: 30000,
    },
  },
];
