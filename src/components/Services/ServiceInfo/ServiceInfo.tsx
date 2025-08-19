import { Variants, motion } from "framer-motion";
import { Services } from "../../../types/services.type";
import Cancel from "/Cancel.svg";
import CategoryText from "../../../UI/CategoryText";
import { masterText, timeLast } from "../Services.data";
import Image from "../../../UI/Image";
import ServiceInfoOptions from "./ServiceInfoOptions";

type Props = {
  service: Services;
  onClickRemoveService: () => void;
};

const newServiceVariants: Variants = {
  initial: { opacity: 0, scale: 1.05 },
  exit: { opacity: 0, scale: 1.05 },
  animate: { opacity: 1, scale: 1 },
};

const ServiceInfo = ({ service, onClickRemoveService }: Props) => {
  const { name, category, masters, last, image, cost, options } = service;

  return (
    <motion.section
      variants={newServiceVariants}
      initial="initial"
      exit="exit"
      animate="animate"
      transition={{
        duration: 0.3,
      }}
      className="module"
    >
      <section className="relative space-y-2 rounded-xl bg-white p-6">
        <h2>{name}</h2>

        <section className="flex">
          <section className="space-y-4">
            <article>
              <CategoryText category="Kategoria" body={category} />
              <CategoryText
                category={masterText(masters)}
                body={masters.join(", ")}
              />
              <CategoryText category="Trwanie wizyty" body={timeLast(last)} />
            </article>
            <article>
              <ServiceInfoOptions cost={cost} options={options} />
            </article>
          </section>
          <div className="mobile:size-80 size-30 shrink-0 rounded-xl">
            <Image src={image} alt={name} />
          </div>
        </section>

        <button
          type="button"
          onClick={onClickRemoveService}
          className="absolute top-7 right-7 size-8 rounded-full border p-1"
        >
          <img src={Cancel} alt="Close" />
        </button>
      </section>
    </motion.section>
  );
};

export default ServiceInfo;
