/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Services, ServicesAPI } from "../../../../types/services.type";
import Confirm from "/Confirm.svg";
import Cancel from "/Cancel.svg";
import Delete from "/Delete.svg";
import DropdownHelper from "../../../../UI/DropdownHelper";
import { useServicesContext } from "../../../../context/servicesContext";
import { useNotificationContext } from "../../../../context/notificationContent";
import { produce } from "immer";
import { useMutation } from "@tanstack/react-query";
import { deleteService, updateService } from "../../../../api/services.api";

type Props = {
  product: Services;
  storage: ServicesAPI | null;
  onClickEdit: () => void;
  onChangeStorage: (newItem: ServicesAPI | null) => void;
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

const ServiceManagementProductEdit = ({
  product,
  storage,
  onClickEdit,
  onChangeStorage,
}: Props) => {
  const { addNewNotification } = useNotificationContext();
  const { categories, updateServiceInCache, deleteServicesFromCache } =
    useServicesContext();

  const [{ isChecked, autoFill }, setOptionState] = useState({
    isChecked: product.options.length !== 0,
    autoFill: false,
  });

  const [form, setForm] = useState<ServicesAPI>({
    name: product.name,
    category: product.category,
    cost: product.cost,
    image: null,
    options: product.options,
  });

  useEffect(() => {
    onChangeStorage(form);
  }, []);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "cost" ? Number(value) : value,
    }));
  };

  const handleChangeCheck = () => {
    const newIsChecked = !isChecked;
    setOptionState((prev) => ({ ...prev, isChecked: newIsChecked }));

    if (storage === null) return;

    const { options, cost } = storage;

    if (options.length !== 0) {
      setForm((prev) => ({
        ...prev,
        options: newIsChecked ? options : [],
        cost: newIsChecked ? cost : 0,
      }));
    }

    if (options.length === 0) {
      setForm((prev) => ({
        ...prev,
        options: newIsChecked ? ["Nowa opcja 1", "Nowa opcja 2"] : [],
        cost: newIsChecked ? [0, 0] : cost,
      }));
    }
  };

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: async ({ id, form }: { id: number; form: ServicesAPI }) =>
      await updateService(id, form),
    onSuccess: (updated: Services) => {
      console.log(updated);
      updateServiceInCache(updated);
      onClickEdit();

      addNewNotification(
        "success",
        "Zmieniono treść",
        `Usługa "${updated.name}" zoztała dodana pomyślnie.`,
      );
    },
    onError: (err) => {
      console.error(err);
      addNewNotification(
        "error",
        "Wystąpił błąd",
        "Coś poszło nie tak, spróbuj ponownie",
      );
    },
    onSettled: () => {
      onChangeStorage(null);
      setOptionState((prev) => ({
        ...prev,
        isEditing: false,
        isChecked: product.options.length !== 0,
      }));
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id: number) => deleteService(id),
    onSuccess: (_, id) => {
      deleteServicesFromCache(id);

      addNewNotification(
        "success",
        "Zmieniono treść",
        `Usługa zoztała poprawnie usunięta.`,
      );
    },
    onError: (err) => {
      console.error(err);
      addNewNotification(
        "error",
        "Wystąpił błąd",
        "Coś poszło nie tak, spróbuj ponownie",
      );
    },
  });

  const handleClickAddOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setForm(
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

    setForm(
      produce((draft) => {
        draft.options = draft.options.filter((_, index) => index !== i);
        if (Array.isArray(draft.cost)) {
          draft.cost = draft.cost.filter((_, index) => index !== i);
        }
      }),
    );
  };

  const handleChangeOptionCost = (
    e: ChangeEvent<HTMLInputElement>,
    name: "options" | "cost",
    i: number,
  ) => {
    const { value } = e.target;

    setForm(
      produce((draft) => {
        if (Array.isArray(draft[name])) {
          draft[name][i] = name === "options" ? value : Number(value);
        }
      }),
    );
  };

  const handleClickCancel = () => {
    setForm(storage as ServicesAPI);
    onChangeStorage(null);
    onClickEdit();
    setOptionState((prev) => ({
      ...prev,
      isChecked: product.options.length !== 0,
    }));
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (form.options.some((el) => el.length === 0))
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Nie można zostawiać pustych pól w formularzu.",
      );

    if (form.name.trim() === "" || form.category.trim() === "")
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Nazwa albo kategoria nie mogą być puste.",
      );

    if (
      (form.cost as number) < 0 ||
      (Array.isArray(form.cost) && form.cost.some((el) => el < 0))
    )
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Cena nie może być niegatywną.",
      );

    mutateUpdate({ id: product.id, form });
  };

  const handleClickDelete = async () => {
    mutateDelete(product.id);
  };

  const handleChangeAutofill = (text: string) => {
    setForm((prev) => ({ ...prev, category: text }));
  };

  const handleChangeFocus = (newState: boolean) => {
    setOptionState((prev) => ({ ...prev, autoFill: newState }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    setForm((prev) => ({
      ...prev,
      image: files[0],
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <section className="midpoint:grid-cols-2 mx-1 grid gap-4">
          <div className="space-y-2">
            {INPUT_TEXT.map((inp) => (
              <label key={inp}>
                <p className="font-bold">{nameSwitcher(inp)}</p>
                <input
                  onChange={handleChangeForm}
                  onFocus={() => handleChangeFocus(true)}
                  onBlur={() => handleChangeFocus(false)}
                  value={form[inp]}
                  name={inp}
                  type="text"
                />
                {inp === "category" && autoFill ? (
                  <DropdownHelper
                    options={categories}
                    query={form[inp]}
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
              />
            </label>
          </div>
          <div className="space-y-1">
            {isChecked ? (
              <>
                <p className="font-bold">Opcje</p>
                <div className="grid grid-cols-2 gap-4">
                  <section className="space-y-2">
                    {form.options.map((option, i) => (
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
                          type="text"
                        />
                      </label>
                    ))}
                  </section>
                  <section className="space-y-2">
                    {Array.isArray(form.cost) &&
                      form.cost.map((price, i) => (
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
                            />
                          </label>
                          <button
                            type="button"
                            onClick={(e) => handleClickDeleteOption(e, i)}
                            className="aspect-square size-8 rounded-xl border"
                          >
                            <img src={Cancel} alt="Cancel" />
                          </button>
                        </section>
                      ))}
                  </section>
                </div>
                <button
                  type="button"
                  onClick={handleClickAddOption}
                  className="w-fit rounded-full border px-2 py-1"
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
                      onChange={handleChangeCheck}
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
                      onChange={handleChangeCheck}
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
                      value={form.cost as number}
                      name="cost"
                      type="number"
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
            className="serviceManagementButton bg-amber-200"
            onClick={handleClickDelete}
          >
            <img src={Delete} alt="Delete" loading="lazy" />
          </button>
          <button
            type="button"
            className="serviceManagementButton bg-red-200"
            onClick={handleClickCancel}
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
    </>
  );
};

export default ServiceManagementProductEdit;
