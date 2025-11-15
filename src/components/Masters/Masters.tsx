import MastersIcon from "./MastersIcon";
import { useMastersContext } from "../../@context/mastersContext";
import Loading from "../Loading";

const Masters = () => {
  const { masters, mastersLoading } = useMastersContext();

  return (
    <div data-testid="masters">
      <h1>Witaj naszych mistrzów</h1>
      {mastersLoading && <Loading />}

      {!mastersLoading && (
        <section className="tablet:grid-cols-3 mobile:grid-cols-2 grid grid-cols-1 gap-8">
          {masters.map((master) => (
            <MastersIcon key={master.id} master={master} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Masters;
