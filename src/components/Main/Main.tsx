import { mainContent } from "./Main.data";
import MainParagraf from "./MainParagraf";

const Main = () => {
  return (
    <section>
      <h1>Witaj w Warsztat Pięknych Włosów</h1>
      <h2 className="mb-4">Szybko, Zajebiste, Drogo</h2>
      <section className="flex flex-col gap-8">
        {mainContent.map((content) => (
          <MainParagraf key={content.title} content={content} />
        ))}
      </section>
    </section>
  );
};

export default Main;
