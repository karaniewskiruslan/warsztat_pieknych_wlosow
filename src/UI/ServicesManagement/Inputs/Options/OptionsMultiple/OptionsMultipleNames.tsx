import { ChangeEvent } from "react";
import OptionsInput from "../OptionsInput";

type Props = {
  options: string[];
  onChangeOptionName: (
    e: ChangeEvent<HTMLInputElement>,
    name: "options" | "cost" | "masters",
    i: number,
  ) => void;
};

const OptionsMultipleNames = ({ options, onChangeOptionName }: Props) => {
  return (
    <section className="space-y-2">
      {options.map((option, i) => (
        <OptionsInput
          key={i}
          option={option}
          i={i}
          onChangeOptionName={onChangeOptionName}
        />
      ))}
    </section>
  );
};

export default OptionsMultipleNames;
