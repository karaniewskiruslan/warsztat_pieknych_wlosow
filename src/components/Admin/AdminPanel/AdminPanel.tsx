import { useNavigate } from "react-router";

const AdminPanel = () => {
  const nav = useNavigate();

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    nav("/admin");
  };

  return (
    <section className="relative">
      <h2>Panel admina</h2>
      <p>Cześć, Natalka!</p>
      <p>
        Miło Cię widzieć tu znowu. Zarządzaj wszystkimi możliwymi danymi oraz
        umówionymi wizitami. Na dole odnajdziesz wszystkie opcję zarządzania
        stroną.
      </p>

      <button
        onClick={handleClickLogout}
        className="absolute -top-10 left-0 z-10 flex h-10 cursor-pointer items-center justify-center rounded-full border px-4 py-2 font-bold duration-300 hover:bg-black hover:text-white 2xl:top-0 2xl:-left-36"
      >
        Wylogój się
      </button>
    </section>
  );
};

export default AdminPanel;
