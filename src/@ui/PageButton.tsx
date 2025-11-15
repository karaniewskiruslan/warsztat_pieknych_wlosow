type Props = {
  onClick: () => void;
  text: string;
};

const PageButton = ({ onClick, text }: Props) => {
  return (
    <button
      onClick={onClick}
      className="absolute -top-8 left-0 z-10 flex h-8 items-center justify-center rounded-full border px-3 py-1.5 font-bold duration-300 hover:bg-black hover:text-white 2xl:top-0 2xl:-left-36"
    >
      {text}
    </button>
  );
};

export default PageButton;
