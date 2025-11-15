import { ChangeEvent } from "react";

type Props = {
  cost: number;
  onChangeCost: (e: ChangeEvent<HTMLInputElement>) => void;
};

const OptionsSingleInput = ({ cost, onChangeCost }: Props) => {
  return (
    <label className="flex items-center justify-center gap-4 space-y-1">
      <p className="font-bold">Zł:</p>
      <input onChange={onChangeCost} value={cost} name="cost" type="number" />
    </label>
  );
};

export default OptionsSingleInput;
