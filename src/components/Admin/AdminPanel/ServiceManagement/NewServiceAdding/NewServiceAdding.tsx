import { ChangeEvent, FormEvent, useState } from "react";
import { Services, ServicesAPI } from "../../../../../types/services";
import { postService } from "../../../../../api/services.api";
import Confirm from "/Confirm.svg";
import Cancel from "/Cancel.svg";
import { produce } from "immer";

type Props = {
  onChangeServiceAdd: (newData: Services) => void;
  onClickAddNewService: () => void;
};

const INPUT_TEXT: ("name" | "category" | "image")[] = [
  "name",
  "category",
  "image",
];

const nameSwitcher = (name: "name" | "category" | "image") => {
  switch (name) {
    case "name":
      return "Nazwa:";
    case "category":
      return "Kategoria:";
    default:
      return "Obrazek:";
  }
};

const NewServiceAdding = ({
  onChangeServiceAdd,
  onClickAddNewService,
}: Props) => {
  const [isChecked, setChecked] = useState(false);

  const [newForm, setNewForm] = useState<ServicesAPI>({
    name: "",
    category: "",
    cost: 0,
    image: "",
    options: [],
  });

  const { cost, options } = newForm;

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewForm((prev) => ({
      ...prev,
      [name]: name === "cost" ? Number(value) : value,
    }));
  };

  const handleChangeChecked = () => {
    setChecked((prevChecked) => {
      const nextChecked = !prevChecked;

      setNewForm((prev) => ({
        ...prev,
        options: nextChecked ? ["Nowa opcja 1", "Nowa opcja 2"] : [],
        cost: nextChecked ? [0, 0] : 0,
      }));

      return nextChecked;
    });
  };

  const handleCLickCancel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    onClickAddNewService();
  };

  const handleChangeOptionCost = (
    e: ChangeEvent<HTMLInputElement>,
    name: "options" | "cost",
    i: number,
  ) => {
    const { value } = e.target;

    setNewForm(
      produce((draft) => {
        if (Array.isArray(draft[name])) {
          draft[name][i] = name === "options" ? value : Number(value);
        }
      }),
    );
  };

  const handleClickAddOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setNewForm(
      produce((draft) => {
        draft.options.push("Nowa opcja");
        if (Array.isArray(draft.cost)) {
          draft.cost.push(0);
        }
      }),
    );
  };

  const handleClickDeleteOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number,
  ) => {
    e.preventDefault();

    setNewForm(
      produce((draft) => {
        draft.options = draft.options.filter((_, index) => index !== i);
        if (Array.isArray(draft.cost)) {
          draft.cost = draft.cost.filter((_, index) => index !== i);
        }
      }),
    );
  };

  const handleClickConfirm = async () => {
    if (options.some((el) => el.length === 0)) {
      return alert("Nie można dodać pustej opcji");
    }

    try {
      const dataAdding = postService(newForm);

      onChangeServiceAdd(await dataAdding);
      onClickAddNewService();
    } catch {
      throw new Error("Test error");
    }
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    handleClickConfirm();
  };

  return (
    <section className="fixed top-0 left-0 grid h-dvh w-dvw place-items-center bg-[#0000006e]">
      <div className="mobile:w-[max(400px,60dvw)] m-6 w-full space-y-3 rounded-2xl bg-white p-6">
        <h2>Dodawanie nowej usługi</h2>
        <form onSubmit={handleSubmitForm}>
          <section className="midpoint:grid-cols-2 mx-1 grid gap-4">
            <div className="space-y-2">
              {INPUT_TEXT.map((inp) => (
                <label key={inp} className="space-y-1">
                  <p className="font-bold">{nameSwitcher(inp)}</p>
                  <input
                    className="serviceManagementInput"
                    onChange={handleChangeForm}
                    value={newForm[inp]}
                    name={inp}
                    type="text"
                    required
                  />
                </label>
              ))}
            </div>
            <div className="space-y-1">
              {isChecked ? (
                <>
                  <p className="font-bold">Opcje</p>
                  <div className="grid grid-cols-2 gap-4">
                    <section className="space-y-2">
                      {options.map((option, i) => (
                        <label
                          key={i}
                          className="flex items-center justify-center gap-4 space-y-1"
                        >
                          <input
                            className="serviceManagementInput"
                            onChange={(e) =>
                              handleChangeOptionCost(e, "options", i)
                            }
                            value={option}
                            name={`option ${i}`}
                            type="string"
                            required
                          />
                        </label>
                      ))}
                    </section>
                    <section className="space-y-2">
                      {Array.isArray(cost) &&
                        cost.map((price, i) => (
                          <section key={i} className="flex items-center gap-2">
                            <label className="flex items-center justify-center gap-4 space-y-1">
                              <p className="font-bold">Zł:</p>
                              <input
                                className="serviceManagementInput"
                                onChange={(e) =>
                                  handleChangeOptionCost(e, "cost", i)
                                }
                                value={+price}
                                name={`price ${i}`}
                                type="number"
                                required
                              />
                            </label>
                            <button
                              onClick={(e) => handleClickDeleteOption(e, i)}
                              className="aspect-square size-8 rounded-xl border"
                              type="button"
                            >
                              <img src={Cancel} alt="Cancel" />
                            </button>
                          </section>
                        ))}
                    </section>
                  </div>
                  <button
                    onClick={handleClickAddOption}
                    className="w-fit rounded-full border px-2 py-1"
                    type="button"
                  >
                    Dodaj opcję
                  </button>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        className=""
                        name="options"
                        checked={isChecked}
                        onChange={handleChangeChecked}
                      />
                      <span className="checkmark peer-checked::after:size-3"></span>
                      Wieloopcjyna usługa
                    </label>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2">
                  <section className="">
                    <label>
                      <input
                        type="checkbox"
                        className=""
                        name="options"
                        checked={isChecked}
                        onChange={handleChangeChecked}
                      />
                      <span className="checkmark peer-checked::after:size-3"></span>
                      Wieloopcjyna usługa
                    </label>
                  </section>
                  <section>
                    <label className="flex items-center justify-center gap-4 space-y-1">
                      <p className="font-bold">Zł:</p>
                      <input
                        className="serviceManagementInput"
                        onChange={handleChangeForm}
                        value={cost as number}
                        name="cost"
                        type="number"
                        required
                      />
                    </label>
                  </section>
                </div>
              )}
            </div>
          </section>
          <section className="flex justify-end gap-2">
            <button
              type="button"
              className="serviceManagementButton bg-red-200"
              onClick={(e) => handleCLickCancel(e)}
            >
              <img src={Cancel} alt="Cancel" />
            </button>
            <button
              className="serviceManagementButton bg-emerald-200"
              onClick={handleClickConfirm}
              type="button"
            >
              <img src={Confirm} alt="Confirm" />
            </button>
          </section>
        </form>
      </div>
    </section>
  );
};

export default NewServiceAdding;
