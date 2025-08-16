import { ChangeEvent } from "react";

type Props = {
  name: string;
  title: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputServicesFile = ({ name, title, onChange }: Props) => {
  return (
    <label>
      <p className="font-bold">{title}</p>
      <input onChange={onChange} accept="image/*" name={name} type="file" />
    </label>
  );
};

export default InputServicesFile;
