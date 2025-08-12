import { ChangeEvent, FormEvent, useState } from "react";
import { Services, ServicesAPI } from "../../../../types/services.type";
import { motion, Variants } from "framer-motion";
import ServiceManagementProductInfo from "./ServiceManagementProductInfo";
import { produce } from "immer";
import classNames from "classnames";
import Expand from "/Expand.svg";

import { deleteService, updateService } from "../../../../api/services.api";
import ServiceManagementProductEdit from "./ServiceManagementProductEdit";
import { useNotificationContext } from "../../../../context/notificationContent";

type Props = {
  categories: string[];
  product: Services;
  onChangeServiceUpdate: (id: number, newData: ServicesAPI) => void;
  onChangeServiceAfterDelete: (newList: Services[]) => void;
};

const mainSectionVariants: Variants = {
  initial: { height: 0, opacity: 0 },
  exit: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
};

const containerSectionVariants: Variants = {
  initial: { scale: 0.9, x: -60, opacity: 0.3 },
  exit: { scale: 0.9, x: 30, opacity: 0.3 },
  animate: { scale: 1, x: 0, opacity: 1 },
};

const ServiceManagementProduct = ({
  categories,
  product,
  onChangeServiceUpdate,
  onChangeServiceAfterDelete,
}: Props) => {
  const { addNewNotification } = useNotificationContext();
  const [{ isOpen, isEditing, isChecked, autoFill }, setOptionState] = useState(
    {
      isOpen: false,
      isEditing: false,
      isChecked: product.options.length !== 0,
      autoFill: false,
    },
  );
  const [optionForm, setOptionForm] = useState<ServicesAPI>({
    name: product.name,
    category: product.category,
    cost: product.cost,
    image: null,
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
        options: newIsChecked ? options : [],
        cost: newIsChecked ? cost : 0,
      }));
    }

    if (options.length === 0) {
      setOptionForm((prev) => ({
        ...prev,
        options: newIsChecked ? ["Nowa opcja 1", "Nowa opcja 2"] : [],
        cost: newIsChecked ? [0, 0] : cost,
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

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (optionForm.options.some((el) => el.length === 0))
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Nie można zostawiać pustych pól w formularzu.",
      );

    if (optionForm.name.trim() === "" || optionForm.category.trim() === "")
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Nazwa albo kategoria nie mogą być puste.",
      );

    if (
      (optionForm.cost as number) < 0 ||
      (Array.isArray(optionForm.cost) && optionForm.cost.some((el) => el < 0))
    )
      return addNewNotification(
        "error",
        "Wystąpił błąd",
        "Cena nie może być niegatywną.",
      );

    try {
      const dataChanging = await updateService(product.id, optionForm);

      onChangeServiceUpdate(product.id, dataChanging);
      addNewNotification(
        "success",
        "Zmieniono treść",
        `Usługa "${optionForm.name}" zoztała poprawnie zaktualizowana.`,
      );
    } catch (err) {
      console.error(err);
      addNewNotification(
        "error",
        "Wystąpił błąd",
        "Coś poszło nie tak, spróbuj ponownie",
      );
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
      const dataDeleting = await deleteService(product.id);

      onChangeServiceAfterDelete(dataDeleting);
      addNewNotification(
        "success",
        "Usunięte poprawnie",
        `Usługa "${product.name}" została usunięta.`,
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeAutofill = (text: string) => {
    setOptionForm((prev) => ({ ...prev, category: text }));
  };

  const handleChangeFocus = (newState: boolean) => {
    setTimeout(() => {
      setOptionState((prev) => ({ ...prev, autoFill: newState }));
    }, 1);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    setOptionForm((prev) => ({
      ...prev,
      image: files[0],
    }));
  };

  return (
    <motion.section
      key={product.id}
      variants={mainSectionVariants}
      initial="initial"
      exit="exit"
      animate="animate"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="grid rounded-3xl border px-4 py-2"
    >
      <motion.section
        transition={{ duration: 0.15, ease: "easeInOut" }}
        initial="initial"
        exit="exit"
        animate="animate"
        variants={containerSectionVariants}
      >
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
                src={Expand}
                alt="expand"
                loading="lazy"
                className={classNames("duration-75", { "-rotate-180": isOpen })}
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
                autoFill={autoFill}
                onChangeAutofill={handleChangeAutofill}
                onChangeFocus={handleChangeFocus}
                onCLickCancel={handleClickCancel}
                onChangeCheck={handleChangeCheck}
                onChangeForm={handleChangeForm}
                onChangeOptionCost={handleChangeOptionCost}
                onClickAddOption={handleClickAddOption}
                onClickDeleteOption={handleClickDeleteOption}
                onSubmitForm={handleSubmitForm}
                onClickDelete={handleClickDelete}
                onFileChange={handleFileChange}
              />
            ) : (
              <ServiceManagementProductInfo
                product={product}
                onCLickOpen={handleClickEditing}
              />
            )}
          </div>
        </section>
      </motion.section>
    </motion.section>
  );
};

export default ServiceManagementProduct;
