import { ChangeEvent } from "react";

type Props = {
  option: string;
  i: number;
  onChangeOptionName: (
    e: ChangeEvent<HTMLInputElement>,
    name: "options" | "cost" | "masters",
    i: number,
  ) => void;
};

const OptionsInput = ({ option, i, onChangeOptionName }: Props) => {
  return (
    <label className="flex items-center justify-center gap-4 space-y-1">
      <input
        onChange={(e) => onChangeOptionName(e, "options", i)}
        value={option}
        name={`option ${i}`}
        type="text"
      />
    </label>
  );
};

export default OptionsInput;
