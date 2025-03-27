import { NavLink } from "react-router";
import logo from "/img/logo_transparent_name.webp";
import burgerMenuClose from "/img/CloseBurgerMenu.svg";
import { menuOptions } from "../Header.data";
import classNames from "classnames";

type Props = {
  isBurgerOpen: boolean;
  onClickCloseMenu: (state?: boolean) => void;
};

const BurgerMenu = ({ onClickCloseMenu, isBurgerOpen }: Props) => {
  const handleClickCloseMenu = () => {
    if (isBurgerOpen) onClickCloseMenu();
  };

  return (
    <section
      className={classNames(
        "fixed top-0 left-0 flex h-full w-full flex-col items-center justify-center gap-16 bg-black text-white duration-300 ease-in-out",
        isBurgerOpen ? "translate-0 opacity-100" : "translate-x-full opacity-0",
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
