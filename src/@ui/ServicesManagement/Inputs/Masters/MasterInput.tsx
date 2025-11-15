import { ChangeEvent } from "react";
import Cancel from "/Cancel.svg";

type Props = {
  master: string;
  i: number;
  onChangeMasterName: (
    e: ChangeEvent<HTMLInputElement>,
    name: "masters",
    i: number,
  ) => void;
  onClickDeleteMaster: (i: number) => void;
};

const MasterInput = ({
  master,
  i,
  onChangeMasterName,
  onClickDeleteMaster,
}: Props) => {
  return (
    <section className="flex items-center gap-2">
      <label className="flex items-center justify-center gap-4">
        <input
          onChange={(e) => onChangeMasterName(e, "masters", i)}
          value={master}
          name={"master" + i}
          type="text"
        />
      </label>
      <button
        onClick={() => onClickDeleteMaster(i)}
        className="aspect-square size-8 rounded-xl border"
        type="button"
      >
        <img src={Cancel} alt="Cancel" loading="lazy" />
      </button>
    </section>
  );
};

export default MasterInput;
