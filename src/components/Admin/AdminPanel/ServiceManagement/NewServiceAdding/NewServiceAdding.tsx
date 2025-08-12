import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Services, ServicesAPI } from "../../../../../types/services.type";
import { postService } from "../../../../../api/services.api";
import Confirm from "/Confirm.svg";
import Cancel from "/Cancel.svg";
import { produce } from "immer";
import DropdownHelper from "../../../../../UI/DropdownHelper";
import { useNotificationContext } from "../../../../../context/notificationContent";

type Props = {
  categories: string[];
  onChangeServiceAdd: (newData: Services) => void;
  onClickAddNewService: () => void;
};

const INPUT_TEXT: ("name" | "category")[] = ["name", "category"];

const nameSwitcher = (name: "name" | "category") => {
  switch (name) {
    case "name":
      return "Nazwa:";
    default:
      return "Kategoria:";
  }
};

const NewServiceAdding = ({
  categories,
  onChangeServiceAdd,
  onClickAddNewService,
}: Props) => {
  const { addNewNotification } = useNotificationContext();
  const [{ isChecked, errorText, autoFill }, setNewServiceOptions] = useState({
    isChecked: false,
    errorText: "",
    autoFill: false,
  });

  const [newForm, setNewForm] = useState<ServicesAPI>({
    name: "",
    category: "",
    cost: 0,
    options: [],
    image: null,
  });

  const { name, category, image, cost, options } = newForm;

  useEffect(() => {
    if (options.some((el) => el.length === 0)) {
      return setNewServiceOptions((prev) => ({
        ...prev,
        errorText: "Nie można dodać pustej opcji",
      }));
    }

    if (name.trim() === "" || category.trim() === "") {
      return setNewServiceOptions((prev) => ({
        ...prev,
        errorText: "Nie można pozostawiać pustych pól",
      }));
    }

    if (
      (cost as number) < 0 ||
      (Array.isArray(cost) && cost.some((el) => el < 0))
    ) {
      return setNewServiceOptions((prev) => ({
        ...prev,
        errorText: "Nie można wpisać negatywnej ceny",
      }));
    }

    return setNewServiceOptions((prev) => ({
      ...prev,
      errorText: "",
    }));
  }, [category, image, name, cost, options]);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewForm((prev) => ({
      ...prev,
      [name]: name === "cost" ? Number(value) : value,
    }));
  };

  const handleChangeChecked = () => {
    setNewServiceOptions((prev) => {
      const nextChecked = !prev.isChecked;

      setNewForm((prev) => ({
        ...prev,
        options: nextChecked ? ["Nowa opcja 1", "Nowa opcja 2"] : [],
        cost: nextChecked ? [0, 0] : 0,
      }));

      return { ...prev, isChecked: nextChecked };
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

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (options.some((el) => el.length === 0))
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Nie można zostawiać pustych pól w formularzu.",
      );

    if (name.trim() === "" || category.trim() === "")
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Nazwa albo kategoria nie mogą być puste.",
      );

    if (
      (cost as number) < 0 ||
      (Array.isArray(cost) && cost.some((el) => el < 0))
    )
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Cena nie może być niegatywną.",
      );

    try {
      const dataAdding = await postService(newForm);

      onChangeServiceAdd(dataAdding);
      onClickAddNewService();
      addNewNotification(
        "added",
        "Dodana usługa",
        `Usługa "${name}" dodana pomyślnie`,
      );
    } catch (e) {
      console.error(e);
      addNewNotification(
        "error",
        "Wystąpił błąd",
        "Coś poszło nie tak, spróbuj ponownie",
      );
    }
  };

  const handleChangeFocus = (newState: boolean) => {
    setTimeout(() => {
      setNewServiceOptions((prev) => ({ ...prev, autoFill: newState }));
    }, 10);
  };

  const handleChangeAutofill = (text: string) => {
    setNewForm((prev) => ({ ...prev, category: text }));
    handleChangeFocus(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    setNewForm((prev) => ({
      ...prev,
      image: files[0],
    }));
  };

  return (
    <section className="fixed top-0 left-0 grid h-dvh w-dvw place-items-center bg-[#0000006e]">
      <div className="mobile:w-[max(400px,60dvw)] m-6 w-full space-y-3 rounded-2xl bg-white p-6">
        <h2>Dodawanie nowej usługi</h2>
        <form onSubmit={handleSubmitForm}>
          <section className="midpoint:grid-cols-2 mx-1 grid gap-4">
            <div className="space-y-2">
              {INPUT_TEXT.map((inp) => (
                <label
                  key={inp}
                  onFocus={() => {
                    if (inp === "category") handleChangeFocus(true);
                  }}
                  onBlur={() => {
                    if (inp === "category") handleChangeFocus(false);
                  }}
                >
                  <p className="font-bold">{nameSwitcher(inp)}</p>
                  <input
                    onChange={handleChangeForm}
                    value={newForm[inp]}
                    name={inp}
                    type="text"
                    required
                  />
                  {inp === "category" && autoFill ? (
                    <DropdownHelper
                      options={categories}
                      query={category}
                      onChange={handleChangeAutofill}
                    />
                  ) : null}
                </label>
              ))}

              <label>
                <p className="font-bold">Obrazek</p>
                <input
                  onChange={handleFileChange}
                  accept="image/*"
                  name="image"
                  type="file"
                  required
                />
              </label>
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
                              <img src={Cancel} alt="Cancel" loading="lazy" />
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
                      Wieloopcyjna usługa
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
                      Wieloopcyjna usługa
                    </label>
                  </section>
                  <section>
                    <label className="flex items-center justify-center gap-4 space-y-1">
                      <p className="font-bold">Zł:</p>
                      <input
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
              {!!errorText.length && (
                <p className="font-bold text-red-400">{errorText}</p>
              )}
            </div>
          </section>
          <section className="flex justify-end gap-2">
            <button
              type="button"
              className="serviceManagementButton bg-red-200"
              onClick={(e) => handleCLickCancel(e)}
            >
              <img src={Cancel} alt="Cancel" loading="lazy" />
            </button>
            <button
              className="serviceManagementButton bg-emerald-200"
              type="submit"
            >
              <img src={Confirm} alt="Confirm" loading="lazy" />
            </button>
          </section>
        </form>
      </div>
    </section>
  );
};

export default NewServiceAdding;
