import { ChangeEvent, FormEvent } from "react";
import { ServicesAPI } from "../../../../types/services";
import Confirm from "/Confirm.svg";
import Cancel from "/Cancel.svg";
import Delete from "/Delete.svg";
import DropdownHelper from "../../../../UI/DropdownHelper";

type Props = {
  isChecked: boolean;
  form: ServicesAPI;
  categories: string[];
  errorText: string;
  autoFill: boolean;
  onChangeFocus: (newState: boolean) => void;
  onChangeAutofill: (text: string) => void;
  onSubmitForm: (e: FormEvent) => void;
  onChangeForm: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeOptionCost: (
    e: ChangeEvent<HTMLInputElement>,
    name: "options" | "cost",
    i: number,
  ) => void;
  onClickDeleteOption: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number,
  ) => void;
  onClickAddOption: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onChangeCheck: () => void;
  onCLickCancel: () => void;
  onClickConfirm: () => Promise<void>;
  onClickDelete: () => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  isChecked,
  form,
  categories,
  errorText,
  autoFill,
  onChangeFocus,
  onChangeAutofill,
  onSubmitForm,
  onChangeForm,
  onChangeOptionCost,
  onClickDeleteOption,
  onClickAddOption,
  onChangeCheck,
  onCLickCancel,
  onClickConfirm,
  onClickDelete,
  onFileChange,
}: Props) => {
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <section className="midpoint:grid-cols-2 mx-1 grid gap-4">
          <div className="space-y-2">
            {INPUT_TEXT.map((inp) => (
              <label key={inp}>
                <p className="font-bold">{nameSwitcher(inp)}</p>
                <input
                  className="serviceManagementInput"
                  onChange={onChangeForm}
                  onFocus={() => onChangeFocus(true)}
                  onBlur={() => onChangeFocus(false)}
                  value={form[inp]}
                  name={inp}
                  type="text"
                  required
                />
                {inp === "category" && autoFill ? (
                  <DropdownHelper
                    options={categories}
                    query={form[inp]}
                    onChange={onChangeAutofill}
                  />
                ) : null}
              </label>
            ))}

            <label>
              <p className="font-bold">Obrazek</p>
              <input
                className="serviceManagementInput"
                onChange={onFileChange}
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
                    {form.options.map((option, i) => (
                      <label
                        key={i}
                        className="flex items-center justify-center gap-4 space-y-1"
                      >
                        <input
                          className="serviceManagementInput"
                          onChange={(e) => onChangeOptionCost(e, "options", i)}
                          value={option}
                          name={`option ${i}`}
                          type="string"
                          required
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
                              className="serviceManagementInput"
                              onChange={(e) => onChangeOptionCost(e, "cost", i)}
                              value={+price}
                              name={`price ${i}`}
                              type="number"
                              required
                            />
                          </label>
                          <button
                            type="button"
                            onClick={(e) => onClickDeleteOption(e, i)}
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
                  onClick={onClickAddOption}
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
                      onChange={onChangeCheck}
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
                      onChange={onChangeCheck}
                    />
                    <span className="checkmark peer-checked::after:size-3"></span>
                    Wieloopcyjna usługa
                  </label>
                </section>
                <section>
                  <label className="flex items-center justify-center gap-4 space-y-1">
                    <p className="font-bold">Zł:</p>
                    <input
                      className="serviceManagementInput"
                      onChange={onChangeForm}
                      value={form.cost as number}
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
            className="serviceManagementButton bg-amber-200"
            onClick={onClickDelete}
          >
            <img src={Delete} alt="Delete" loading="lazy" />
          </button>
          <button
            type="button"
            className="serviceManagementButton bg-red-200"
            onClick={onCLickCancel}
          >
            <img src={Cancel} alt="Cancel" loading="lazy" />
          </button>
          <button
            className="serviceManagementButton bg-emerald-200"
            onClick={onClickConfirm}
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
