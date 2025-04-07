import { MasterInfo } from "../../types/masterInfo";
import { LayoutGroup, motion } from "framer-motion";

type Props = {
  master: MasterInfo;
};

const detailsVariants = {
  initial: { opacity: 0, height: 0 },
  exit: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  hover: { opacity: 1, height: "auto" },
};

const MastersIcon = ({ master }: Props) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className="relative flex aspect-square cursor-pointer items-end overflow-hidden rounded-3xl border-transparent bg-gray-100 duration-300 hover:scale-105 hover:border-2 hover:border-gray-200"
    >
      <img
        src=""
        alt={master.name}
        className="pointer-events-none absolute h-full w-full"
      />
      <article className="px-4 py-2">
        <h2>{master.name}</h2>
        <h3>{master.profession}</h3>
        <LayoutGroup>
          <motion.section
            layout
            variants={detailsVariants}
            className="overflow-hidden"
          >
            <h3>{master.experience}</h3>
          </motion.section>
        </LayoutGroup>
      </article>
    </motion.div>
  );
};

export default MastersIcon;
