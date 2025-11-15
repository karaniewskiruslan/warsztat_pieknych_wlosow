import { ChangeEvent } from "react";
import OptionsCheckbox from "../OptionsCheckbox";
import OptionsSingleInput from './OptionsSingleInput';

type Props = {
  cost: number;
  isChecked: boolean;
  onChangeCheckbox: () => void;
  onChangeCost: (e: ChangeEvent<HTMLInputElement>) => void;
};

const OptionsSingle = ({
  cost,
  isChecked,
  onChangeCheckbox,
  onChangeCost,
}: Props) => {
  return (
    <div className="grid grid-cols-2">
      <section>
        <OptionsCheckbox
          isChecked={isChecked}
          onChangeCheckbox={onChangeCheckbox}
        />
      </section>
      <section>
        <OptionsSingleInput cost={cost} onChangeCost={onChangeCost} />
      </section>
    </div>
  );
};

export default OptionsSingle;
