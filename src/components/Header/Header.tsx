import { NavLink } from "react-router";
import logo from "../../../public/img/logo_transparent.webp";
import { menuOptions } from "./Header.data";

const Header = () => {
  return (
    <header
      data-header
      className="font-buford flex w-full justify-between bg-black px-8 py-4 text-3xl text-white"
    >
      <img src={logo} alt="Logo" className="h-10" />
      <nav className="flex items-center gap-8 text-xl">
        {menuOptions.map((option) => (
          <NavLink to={option.to} key={option.title}>
            {option.title}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
