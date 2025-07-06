import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import { mastersInfo } from "../Masters.data";
import { MasterInfo } from "../../../types/masterInfo";

type Props = {
  masterInfo?: MasterInfo;
};

const Master = ({ masterInfo }: Props) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const info =
    masterInfo ?? mastersInfo.find((master) => master.name === name)!;

  if (!info) return <div data-testid="master-not-found">Master not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative"
      data-testid="master"
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute -top-10 left-0 z-10 flex h-10 cursor-pointer items-center justify-center rounded-full border px-4 py-2 font-bold duration-300 hover:bg-black hover:text-white 2xl:top-0 2xl:-left-36"
      >
        {"< Wstecz"}
      </button>
      <h1>Master {name}</h1>
      <h2>
        {info.profession} | {info.experience}
      </h2>
    </motion.div>
  );
};

export default Master;
