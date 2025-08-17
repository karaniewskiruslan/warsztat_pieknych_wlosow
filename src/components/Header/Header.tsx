import { NavLink } from "react-router";
import logo from "/img/logo_transparent_name.webp";
import burgerMenuIcon from "/img/BurgerMenu.svg";
import { menuOptions } from "./Header.data";
import { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import useWindowSize from "../../hooks/useWindowSize.hook";
import useScrollLock from "../../hooks/useScrollLock.hook";
import { AnimatePresence } from "framer-motion";
import Image from "../../UI/Image";

const Header = () => {
  const [isBurgerMenu, toggleBurgerMenu] = useState(false);
  const { width } = useWindowSize();
  const screenWidth = width < 640;
  useScrollLock(isBurgerMenu && screenWidth);

  const toggleMenu = (state: boolean) => {
    toggleBurgerMenu(state);
  };

  useEffect(() => {
    if (!screenWidth) {
      toggleBurgerMenu(false);
    }
  }, [screenWidth, toggleBurgerMenu]);

  return (
    <header
      data-testid="header"
      className="font-buford z-50 flex w-full justify-between bg-black px-8 py-4 text-3xl text-white"
    >
      <div className="aspect-[65/16] h-10">
        <Image src={logo} alt="Logo" />
      </div>
      <nav className="flex items-center gap-8 text-xl">
        {screenWidth ? (
          <button onClick={() => toggleMenu(true)} className="size-10">
            <img src={burgerMenuIcon} alt="Burger menu" loading="lazy" />
          </button>
        ) : (
          menuOptions.map((option) => (
            <NavLink
              to={option.to}
              key={option.title}
              className="tablet:text-2xl text-base"
            >
              {option.title}
            </NavLink>
          ))
        )}
      </nav>
      <AnimatePresence mode="wait">
        {screenWidth && isBurgerMenu && (
          <BurgerMenu onClickCloseMenu={toggleMenu} />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
