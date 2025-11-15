import { useNavigate } from "react-router";
import PageButton from "../../../@ui/PageButton";
import AdminPanelOption from "./AdminPanelOption";
import { adminOptions } from "./AdminPanel.data";

const AdminPanel = () => {
  const nav = useNavigate();

  const handleClickLogout = () => {
    sessionStorage.removeItem("token");
    nav("/admin");
  };

  return (
    <section className="relative grid gap-4">
      <hgroup>
        <h2>Panel admina</h2>
        <p>Cześć, Natalka!</p>
        <p>
          Miło Cię widzieć tu znowu. Zarządzaj wszystkimi możliwymi danymi oraz
          umówionymi wizitami. Na dole odnajdziesz wszystkie opcję zarządzania
          stroną.
        </p>
      </hgroup>

      <section className="midpoint:grid-cols-2 grid grid-cols-1 gap-4">
        {adminOptions.map((el) => (
          <AdminPanelOption
            key={el.optionName}
            optionName={el.optionName}
            optionTitle={el.optionTitle}
            pageSrc={el.pageSrc}
            mainImage={el.mainImage}
            supImage={el.supImage}
            supAnimation={el.supAnimation}
          />
        ))}
      </section>

      <PageButton text="Wyloguj" onClick={handleClickLogout} />
    </section>
  );
};

export default AdminPanel;
