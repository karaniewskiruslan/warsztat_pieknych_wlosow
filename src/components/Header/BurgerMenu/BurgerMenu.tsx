import { NavLink } from "react-router";
import logo from "/img/logo_transparent_name.webp";
import burgerMenuClose from "/img/CloseBurgerMenu.svg";
import { menuOptions } from "../Header.data";
import { motion } from "framer-motion";

type Props = {
  onClickCloseMenu: (state: boolean) => void;
};

const BurgerMenu = ({ onClickCloseMenu }: Props) => {
  return (
    <motion.section
      data-testid="burger-menu"
      key="burger-menu"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 z-50 flex h-full w-full flex-col items-center justify-center gap-16 bg-black text-white ease-in-out"
    >
      <button
        onClick={() => onClickCloseMenu(false)}
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
            onClick={() => onClickCloseMenu(false)}
          >
            {option.title}
          </NavLink>
        ))}
      </nav>
    </motion.section>
  );
};

export default BurgerMenu;
