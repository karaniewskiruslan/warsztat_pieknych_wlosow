import { ChangeEvent } from "react";
import MasterInput from "./MasterInput";

type Props = {
  title: string;
  masters: string[];
  onClickAddMaster: () => void;
  onChangeMasterName: (
    e: ChangeEvent<HTMLInputElement>,
    name: "masters",
    i: number,
  ) => void;
  onClickDeleteMaster: (i: number) => void;
};

const Masters = ({
  title,
  masters,
  onClickAddMaster,
  onChangeMasterName,
  onClickDeleteMaster,
}: Props) => {
  return (
    <div className="space-y-1">
      <p className="font-bold">{title}</p>
      {masters.map((master, i) => (
        <MasterInput
          key={i}
          master={master}
          i={i}
          onChangeMasterName={onChangeMasterName}
          onClickDeleteMaster={onClickDeleteMaster}
        />
      ))}
      <button
        onClick={onClickAddMaster}
        className="w-fit rounded-full border px-2 py-1"
        type="button"
      >
        Dodaj Mistrza
      </button>
    </div>
  );
};

export default Masters;
