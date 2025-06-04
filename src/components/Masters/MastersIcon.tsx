import { NavLink } from "react-router";
import { MasterInfo } from "../../types/masterInfo";
import { motion } from "framer-motion";

type Props = {
  master: MasterInfo;
};

const detailsVariants = {
  initial: { opacity: 0, height: 0 },
  exit: { opacity: 0, height: 0 },
  hover: { opacity: 1, height: "auto" },
};

const MastersIcon = ({ master }: Props) => {
  const MotionNavLink = motion(NavLink);

  return (
    <MotionNavLink
      to={`/masters/${master.name}`}
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
      <motion.article className="px-4 py-2" layout>
        <h2>{master.name}</h2>
        <h3>{master.profession}</h3>
        <motion.section
          key={master.id}
          variants={detailsVariants}
          className="overflow-hidden"
        >
          <p>{master.experience}</p>
        </motion.section>
      </motion.article>
    </MotionNavLink>
  );
};

export default MastersIcon;
