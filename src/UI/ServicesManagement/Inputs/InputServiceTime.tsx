import React, { ChangeEvent } from "react";

type Props = {
  last: number;
  onChangeTime: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputServiceTime = ({ last, onChangeTime }: Props) => {
  return (
    <label>
      <p className="font-bold">Czas trwania usługi:({last * 15} min)</p>
      <input
        onChange={onChangeTime}
        value={last}
        name="last"
        type="number"
      />
    </label>
  );
};

export default InputServiceTime;
