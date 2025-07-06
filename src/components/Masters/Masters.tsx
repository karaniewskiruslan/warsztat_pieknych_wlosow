import { mastersInfo } from "./Masters.data";
import MastersIcon from "./MastersIcon";

const Masters = () => {
  return (
    <div data-testid="masters">
      <h1>Witaj naszych mistrzów</h1>
      <section className="tablet:grid-cols-3 mobile:grid-cols-2 grid grid-cols-1 gap-8">
        {mastersInfo.map((master) => (
          <MastersIcon key={master.id} master={master} />
        ))}
      </section>
    </div>
  );
};

export default Masters;
