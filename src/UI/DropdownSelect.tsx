import classNames from "classnames";
import { useState } from "react";
import Expand from "/Expand.svg";

type Props = {
  name: string;
  title: string;
  current: string;
  options: string[];
  onClickChangeCurrent: (name: string, newOption: string) => void;
};

const DropdownSelect = ({
  name,
  title,
  current,
  options,
  onClickChangeCurrent,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <section className="relative" onBlur={() => setOpen(false)}>
      <p className="font-bold">{title}</p>
      <button
        type="button"
        onClick={handleClickOpen}
        className="flex w-full justify-between rounded-xl border px-2 py-1 text-lg"
      >
        <span>{current}</span>
        <img
          src={Expand}
          alt={open ? "Close" : "Open"}
          className={classNames("size-8 duration-150", {
            "-rotate-180": open,
          })}
        />
      </button>
      <section
        className={classNames(
          "absolute border-2 bg-white text-lg duration-150 z-10",
          "grid w-full translate-y-2 rounded-xl",
          {
            "pointer-events-none grid-rows-[0fr] opacity-0": !open,
            "grid-rows-[1fr]": open,
          },
        )}
      >
        <ul className="flex flex-col overflow-hidden">
          {options?.map((option, i) => (
            <li
              key={i}
              onMouseDown={() => {
                onClickChangeCurrent(name, option);
                setOpen(false);
              }}
              className={classNames(
                "cursor-pointer p-2 select-none hover:bg-gray-200",
                "border-black not-last:border-b-2 first:rounded-t-xl last:rounded-b-xl",
                {
                  "pointer-events-none text-gray-200": current === option,
                },
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default DropdownSelect;
