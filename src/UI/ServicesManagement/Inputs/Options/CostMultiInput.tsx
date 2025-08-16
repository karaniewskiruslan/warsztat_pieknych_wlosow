import { ChangeEvent } from "react";
import Cancel from "/Cancel.svg";

type Props = {
  price: number;
  i: number;
  onChangeCost: (
    e: ChangeEvent<HTMLInputElement>,
    name: "options" | "cost" | "masters",
    i: number,
  ) => void;
  onDeleteOption: (i: number) => void;
};

const CostMultiInput = ({ price, i, onChangeCost, onDeleteOption }: Props) => {
  return (
    <section key={i} className="flex items-center gap-2">
      <label className="flex items-center justify-center gap-4 space-y-1">
        <p className="font-bold">Zł:</p>
        <input
          onChange={(e) => onChangeCost(e, "cost", i)}
          value={+price}
          name={`price ${i}`}
          type="number"
        />
      </label>
      <button
        type="button"
        onClick={() => onDeleteOption(i)}
        className="aspect-square size-8 rounded-xl border"
      >
        <img src={Cancel} alt="Cancel" />
      </button>
    </section>
  );
};

export default CostMultiInput;
