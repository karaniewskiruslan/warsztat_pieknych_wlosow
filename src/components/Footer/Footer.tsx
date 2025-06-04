const CREATION_YEAR = 2025;

const Footer = () => {
  const currentData = new Date().getFullYear();

  return (
    <footer
      data-footer
      className="font-buford mobile:text-2xl flex w-full bg-black px-4 py-2 text-xl text-white"
    >
      {`©
      ${
        CREATION_YEAR === currentData
          ? currentData
          : CREATION_YEAR + "-" + currentData
      }, wszystkie prawa są zastrzeżone`}
      . Icona Manicure zrobiona Oleną Panasovską z
      <a
        href="https://thenounproject.com/browse/icons/term/manicure/"
        target="_blank"
        title="Manicure Icons"
        className="px-2"
      >
        Noun Project
      </a>
      (CC BY 3.0)
    </footer>
  );
};

export default Footer;
