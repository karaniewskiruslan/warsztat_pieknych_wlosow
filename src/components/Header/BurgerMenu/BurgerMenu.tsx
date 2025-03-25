import { NavLink } from "react-router";
import logo from "../../../../public/img/logo_transparent_name.webp";
import burgerMenuClose from "../../../../public/img/CloseBurgerMenu.svg";
import { menuOptions } from "../Header.data";
import { useState } from "react";
import classNames from "classnames";

type Props = {
  onClickCloseMenu: (state?: boolean) => void;
};

const BurgerMenu = ({ onClickCloseMenu }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClickCloseMenu = () => {
    setIsClosing(true);
  };

  const endOfAnimation = () => {
    if (isClosing) {
      onClickCloseMenu(false);
    }
  };

  return (
    <section
      onAnimationEnd={endOfAnimation}
      className={classNames(
        "fixed top-0 left-0 flex h-full w-full flex-col items-center justify-center gap-16 bg-black text-white",
        isClosing ? "animate-burgerMenu-close" : "animate-burgerMenu-open",
      )}
    >
      <button
        onClick={handleClickCloseMenu}
        className="absolute top-4 right-8 size-10 cursor-pointer"
      >
        <img src={burgerMenuClose} alt="Close menu" />
      </button>
      <img src={logo} alt="Logo" className="h-10" />
      <nav className="flex flex-col items-center gap-8 text-xl">
        {menuOptions.map((option) => (
          <NavLink
            to={option.to}
            key={option.title}
            onClick={handleClickCloseMenu}
          >
            {option.title}
          </NavLink>
        ))}
      </nav>
    </section>
  );
};

export default BurgerMenu;
