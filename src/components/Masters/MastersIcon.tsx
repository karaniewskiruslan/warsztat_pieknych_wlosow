import { NavLink } from "react-router";
import { MasterType } from "../../@types/MasterType.type";
import { motion } from "framer-motion";
import Image from "../../@ui/Image";

type Props = {
  master: MasterType;
};

const detailsVariants = {
  initial: { opacity: 0, height: 0 },
  exit: { opacity: 0, height: 0 },
  hover: { opacity: 1, height: "auto" },
};

const MastersIcon = ({ master }: Props) => {
  const MotionNavLink = motion.create(NavLink);

  return (
    <MotionNavLink
      to={`/masters/${master.name}`}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className="relative flex aspect-square items-end overflow-hidden rounded-3xl border-transparent bg-gray-100 duration-300 hover:scale-105 hover:border-2 hover:border-gray-200"
    >
      <motion.article className="z-10 px-4 py-2 text-white" layout>
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
      <Image src={master.image} alt={master.name} isAbsolute={true} />
    </MotionNavLink>
  );
};

export default MastersIcon;
