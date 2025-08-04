import { ChangeEvent, FormEvent, useState } from "react";
import { Services, ServicesAPI } from "../../../../types/services";
import Expand from "/Expand.svg";
import classNames from "classnames";
import ServiceManagementProductInfo from "./ServiceManagementProductInfo";
import { produce } from "immer";

import { deleteService, updateService } from "../../../../api/services.api";
import ServiceManagementProductEdit from "./ServiceManagementProductEdit";

type Props = {
  categories: string[];
  product: Services;
  onChangeServiceUpdate: (id: number, newData: ServicesAPI) => void;
  onChangeServiceAfterDelete: (newList: Services[]) => void;
};

const ServiceManagementProduct = ({
  categories,
  product,
  onChangeServiceUpdate,
  onChangeServiceAfterDelete,
}: Props) => {
  const [{ isOpen, isEditing, isChecked }, setOptionState] = useState({
    isOpen: false,
    isEditing: false,
    isChecked: product.options.length !== 0,
  });
  const [optionForm, setOptionForm] = useState<ServicesAPI>({
    name: product.name,
    category: product.category,
    cost: product.cost,
    image: product.image,
    options: product.options,
  });
  const [optionStorage, setOptionStorage] = useState<ServicesAPI | null>(null);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setOptionForm((prev) => ({
      ...prev,
      [name]: name === "cost" ? Number(value) : value,
    }));
  };

  const handleChangeCheck = () => {
    const newIsChecked = !isChecked;
    setOptionState((prev) => ({ ...prev, isChecked: newIsChecked }));

    if (optionStorage === null) return;

    const { options, cost } = optionStorage;

    if (options.length !== 0) {
      setOptionForm((prev) => ({
        ...prev,
        options: newIsChecked ? [] : options,
        cost: newIsChecked ? 0 : cost,
      }));
    }

    if (options.length === 0) {
      setOptionForm((prev) => ({
        ...prev,
        options: newIsChecked ? [] : ["Nowa opcja 1", "Nowa opcja 2"],
        cost: newIsChecked ? cost : [0, 0],
      }));
    }
  };

  const handleClickAddOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    setOptionForm(
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

    setOptionForm(
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

    setOptionForm(
      produce((draft) => {
        if (Array.isArray(draft[name])) {
          draft[name][i] = name === "options" ? value : Number(value);
        }
      }),
    );
  };

  const handleClickOpen = () => {
    setOptionState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const handleClickEditing = () => {
    setOptionState((prev) => ({ ...prev, isEditing: true }));
    setOptionStorage(optionForm);
  };

  const handleClickCancel = () => {
    setOptionForm(optionStorage as ServicesAPI);
    setOptionStorage(null);
    setOptionState((prev) => ({
      ...prev,
      isEditing: false,
      isChecked: product.options.length !== 0,
    }));
  };

  const handleClickConfirm = async () => {
    if (optionForm.options.some((el) => el.length === 0)) {
      return alert("Nie można dodać pustej opcji");
    }

    if (
      optionForm.name.trim() === "" ||
      optionForm.category.trim() === "" ||
      optionForm.image.trim() === ""
    ) {
      return alert("Nie można pozostawiać pustych pól");
    }

    try {
      const dataChanging = updateService(product.id, optionForm);

      onChangeServiceUpdate(product.id, await dataChanging);
    } catch (err) {
      console.error(err);
    }

    setOptionStorage(null);
    setOptionState((prev) => ({
      ...prev,
      isEditing: false,
      isChecked: product.options.length !== 0,
    }));
  };

  const handleClickDelete = async () => {
    try {
      const dataDeleting = deleteService(product.id);

      onChangeServiceAfterDelete(await dataDeleting);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    handleClickConfirm();
  };

  return (
    <section className="grid rounded-3xl border px-4 py-2">
      <div className="flex justify-between">
        <p className="font-bold">{product.name}</p>
        <section>
          <button
            className={classNames("serviceManagementButton", {
              "pointer-events-none opacity-50": isEditing,
            })}
            onClick={handleClickOpen}
          >
            <img
              className={classNames("duration-75", { "rotate-180": isOpen })}
              src={Expand}
              alt="expand"
            />
          </button>
        </section>
      </div>
      <section
        className={classNames("grid duration-300", {
          "grid-rows-[0fr]": !isOpen,
          "grid-rows-[1fr]": isOpen,
        })}
      >
        <div className="mt-2 overflow-hidden">
          {isEditing ? (
            <ServiceManagementProductEdit
              form={optionForm}
              isChecked={isChecked}
              categories={categories}
              onCLickCancel={handleClickCancel}
              onChangeCheck={handleChangeCheck}
              onChangeForm={handleChangeForm}
              onChangeOptionCost={handleChangeOptionCost}
              onClickAddOption={handleClickAddOption}
              onClickConfirm={handleClickConfirm}
              onClickDeleteOption={handleClickDeleteOption}
              onSubmitForm={handleSubmitForm}
              onClickDelete={handleClickDelete}
            />
          ) : (
            <ServiceManagementProductInfo
              product={product}
              onCLickOpen={handleClickEditing}
            />
          )}
        </div>
      </section>
    </section>
  );
};

export default ServiceManagementProduct;
