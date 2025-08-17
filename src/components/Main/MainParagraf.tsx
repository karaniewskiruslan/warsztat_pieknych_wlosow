import { MainContent } from "../../types/main.type";
import Gallery from "../../UI/Gallery";

type Props = {
  content: MainContent;
};

const MainParagraf = ({ content }: Props) => {
  return (
    <div className="flex flex-col gap-6" key={content.title}>
      <hgroup>
        <h3>{content.title}</h3>
        <p className="text-2xl">{content.content}</p>
      </hgroup>
      <section className="mobile:grid-cols-2 mobile:grid-rows-1 grid h-fit grid-cols-1 grid-rows-1 gap-12">
        <Gallery
          gallery={content.gallery1.gallery}
          scrollDirection={content.gallery1.scrollDirection}
        />
        <Gallery
          gallery={content.gallery2.gallery}
          scrollDirection={content.gallery2.scrollDirection}
        />
      </section>
    </div>
  );
};

export default MainParagraf;
