import { useMemo } from "react";

type Props = {
  query: string;
  options: string[];
  onChange: (value: string) => void;
};

const DropdownHelper = ({ query, options, onChange }: Props) => {
  const filteredList = useMemo(() => {
    return options.filter((el) =>
      el.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }, [query, options]);

  return (
    <>
      {filteredList.length ? (
        <section className="absolute z-10 mt-0.5 w-full overflow-hidden rounded-2xl border bg-white">
          {filteredList.map((option) => (
            <div
              key={option}
              onMouseDown={() => onChange(option)}
              className="cursor-pointer px-4 py-2 not-last:border-b-2 hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        </section>
      ) : null}
    </>
  );
};

export default DropdownHelper;
