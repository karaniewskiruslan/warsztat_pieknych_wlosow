import { mainContent } from "./Main.data";

const Main = () => {
  return (
    <section>
      <h1>Witaj w Warsztat Pięknych Włosów</h1>
      <section className="flex flex-col gap-4">
        {mainContent.map((content) => (
          <div className="flex flex-col gap-2" key={content.title}>
            <h3>{content.title}</h3>
            <p>{content.content}</p>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Main;
