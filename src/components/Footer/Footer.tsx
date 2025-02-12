const CREATION_YEAR = 2025;

const Footer = () => {
  const currentData = new Date().getFullYear();

  return (
    <footer
      data-footer
      className="font-buford flex w-full bg-black px-4 py-2 text-2xl text-white"
    >
      {`©
      ${
        CREATION_YEAR === currentData
          ? currentData
          : CREATION_YEAR + "-" + currentData
      }, wszystkie prawa są zastrzeżone`}
    </footer>
  );
};

export default Footer;
