import { ChangeEvent } from "react";
import CostMultiInput from "../CostMultiInput";

type Props = {
  costs: number[];
  onChangeCost: (
    e: ChangeEvent<HTMLInputElement>,
    name: "options" | "cost" | "masters",
    i: number,
  ) => void;
  onDeleteOption: (i: number) => void;
};

const OptionsMultipleCosts = ({
  costs,
  onChangeCost,
  onDeleteOption,
}: Props) => {
  return (
    <>
      {costs.map((price, i) => (
        <CostMultiInput
          key={i}
          price={price}
          i={i}
          onChangeCost={onChangeCost}
          onDeleteOption={onDeleteOption}
        />
      ))}
    </>
  );
};

export default OptionsMultipleCosts;
