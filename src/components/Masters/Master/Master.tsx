import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import { mastersInfo } from "../Masters.data";
import { masterType } from "../../../types/masterType";
import MasterInfo from "./MasterInfo";
import MasterWorks from "./MasterWorks";
import PageButton from "../../../UI/PageButton";

type Props = {
  masterInfo?: masterType;
};

const Master = ({ masterInfo }: Props) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const info = masterInfo ?? mastersInfo.find((master) => master.name === name);

  const handleClickBack = () => {
    navigate(-1);
  };

  if (!info) return <div data-testid="master-not-found">Master not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative space-y-4"
      data-testid="master"
    >
      <h1>Master {info.name}</h1>
      <h2>
        {info.profession} | {info.experience}
      </h2>
      <MasterInfo
        name={info.name}
        photo={info.masterPhoto}
        description={info.description}
      />
      <MasterWorks name={info.name} masterWorks={info.masterWorksPhotos} />
      <PageButton text="Wstecz <" onClick={handleClickBack} />
    </motion.div>
  );
};

export default Master;
