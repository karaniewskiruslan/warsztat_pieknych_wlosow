import { NavLink } from "react-router";

const EmptyPage = () => {
  return (
    <section>
      <h1>Error page</h1>
      <p>Pewnie coś Cię pomyliło i trafiłeś nie na tą stronę.</p>
      <p>
        Po prostu wróć się na{" "}
        <NavLink to="/" className="underline">
          główną stronę
        </NavLink>
        , lub wybież podstrone z nawigacji
      </p>
    </section>
  );
};

export default EmptyPage;
