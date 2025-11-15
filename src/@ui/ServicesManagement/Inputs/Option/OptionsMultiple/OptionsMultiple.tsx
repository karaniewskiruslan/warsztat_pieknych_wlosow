import { ChangeEvent } from "react";
import OptionsMultipleCosts from "./OptionsMultipleCosts";
import OptionsCheckbox from "../OptionsCheckbox";
import OptionsMultipleNames from "./OptionsMultipleNames";

type Props = {
  options: string[];
  costs: number[];
  isChecked: boolean;
  onChangeValue: (
    e: ChangeEvent<HTMLInputElement>,
    name: "options" | "cost" | "masters",
    i: number,
  ) => void;
  onClickDeleteOption: (i: number) => void;
  onChangeCheckbox: () => void;
  onClickAddOption: () => void;
};

const OptionsMultiple = ({
  options,
  costs,
  isChecked,
  onChangeValue,
  onClickDeleteOption,
  onChangeCheckbox,
  onClickAddOption,
}: Props) => {
  return (
    <>
      <p className="font-bold">Opcje</p>
      <div className="grid grid-cols-2 gap-4">
        <section className="space-y-2">
          <OptionsMultipleNames
            options={options}
            onChangeOptionName={onChangeValue}
          />
        </section>
        <section className="space-y-2">
          <OptionsMultipleCosts
            costs={costs}
            onChangeCost={onChangeValue}
            onDeleteOption={onClickDeleteOption}
          />
        </section>
      </div>
      <button
        type="button"
        onClick={onClickAddOption}
        className="w-fit rounded-full border px-2 py-1"
      >
        Dodaj opcję
      </button>
      <div>
        <OptionsCheckbox
          isChecked={isChecked}
          onChangeCheckbox={onChangeCheckbox}
        />
      </div>
    </>
  );
};

export default OptionsMultiple;
