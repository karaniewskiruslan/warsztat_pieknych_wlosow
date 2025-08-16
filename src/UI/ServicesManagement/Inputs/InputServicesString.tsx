import { ChangeEvent, useState } from "react";
import DropdownHelper from "../../DropdownHelper";
import { useServicesContext } from "../../../context/servicesContext";

type Props = {
  name: string;
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAutoFill?: (text: string) => void;
};

const InputServicesString = ({
  name,
  title,
  value,
  onChange,
  onChangeAutoFill,
}: Props) => {
  const { categories } = useServicesContext();
  const [autoFill, setAutoFill] = useState(false);

  return (
    <label>
      <p className="font-bold">{title}</p>
      <input
        onChange={onChange}
        onFocus={() => setAutoFill(true)}
        onBlur={() => setAutoFill(false)}
        value={value}
        name={name}
        type="text"
      />
      {name === "category" && onChangeAutoFill && autoFill ? (
        <DropdownHelper
          options={categories}
          query={value}
          onChange={onChangeAutoFill}
        />
      ) : null}
    </label>
  );
};

export default InputServicesString;
