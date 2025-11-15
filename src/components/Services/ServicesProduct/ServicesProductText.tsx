import CategoryText from "../../../@ui/CategoryText";
import { masterText, timeLast } from "../Services.data";

type Props = { name: string; masters: string[]; last: number };

const ServicesProductText = ({ name, masters, last }: Props) => {
  return (
    <>
      <h4>{name}</h4>
      <article>
        <CategoryText
          category={masterText(masters)}
          body={masters.join(", ")}
        />
        <CategoryText category="Trwanie wizyty" body={timeLast(last)} />
      </article>
    </>
  );
};

export default ServicesProductText;
