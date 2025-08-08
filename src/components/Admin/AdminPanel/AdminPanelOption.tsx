import { motion, Variants } from "framer-motion";
import { NavLink } from "react-router";
import classNames from "classnames";

type Props = {
  pageSrc: string;
  mainImage: string;
  supImage: string;
  supAnimation: Variants;
  optionName: string;
  optionTitle: string;
  willBeSoon?: boolean;
};

const textVariants = {
  initial: { opacity: 0, height: 0 },
  exit: { opacity: 0, height: 0 },
  hover: { opacity: 1, height: "auto" },
};

const AdminPanelOption = ({
  pageSrc,
  mainImage,
  supImage,
  supAnimation,
  optionName,
  optionTitle,
  willBeSoon,
}: Props) => {
  const MotionNavLink = motion.create(NavLink);

  return (
    <MotionNavLink
      to={pageSrc}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className={classNames("rounded-3xl bg-gray-100 p-8", {
        "pointer-events-none": willBeSoon,
      })}
    >
      <motion.picture className="tablet:size-60 relative flex size-40" layout>
        <motion.img
          className="tablet:size-12 tablet:right-8 tablet:top-18 absolute top-13 right-6 size-8"
          src={supImage}
          variants={supAnimation}
          alt={optionName}
        />
        <img
          src={mainImage}
          loading="lazy"
          className="pointer-events-none"
          alt="Support element"
        />
      </motion.picture>
      <motion.hgroup layout>
        <h3>{optionName}</h3>
        {willBeSoon ? <p className="text-red-500">Będzie wkrótce</p> : null}
        <motion.p variants={textVariants} className="overflow-hidden">
          <span>{optionTitle}</span>
        </motion.p>
      </motion.hgroup>
    </MotionNavLink>
  );
};

export default AdminPanelOption;
