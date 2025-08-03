import { useState } from "react";
import { ServicesAPI } from "../../../../types/services";
import Expand from "/Expand.svg";
import classNames from "classnames";
import ServiceManagementProductInfo from "./ServiceManagementProductInfo";

import Confirm from "/Confirm.svg";
import Cancel from "/Cancel.svg";

type Props = {
  categories: string[];
  product: ServicesAPI;
};

const ServiceManagementProduct = ({ categories, product }: Props) => {
  const [{ isOpen, isEditing }, setOptionState] = useState({
    isOpen: false,
    isEditing: false,
  });
  const [optionForm, setOptionForm] = useState<ServicesAPI>({
    name: product.name,
    category: product.category,
    cost: product.cost,
    image: product.image,
    options: product.options,
  });
  const [optionStorage, setOptionStorage] = useState<ServicesAPI | null>(null);

  const handleClickOpen = () => {
    setOptionState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const handleClickEditing = () => {
    setOptionState((prev) => ({ ...prev, isEditing: true }));
    setOptionStorage(optionForm);
  };

  const handleCLickCancel = () => {
    setOptionForm(optionStorage as ServicesAPI);
    setOptionStorage(null);
    setOptionState((prev) => ({ ...prev, isEditing: false }));
  };

  const handleClickConfirm = () => {
    setOptionForm(optionStorage as ServicesAPI);
    setOptionStorage(null);
    setOptionState((prev) => ({ ...prev, isEditing: false }));
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
            <>
              <form>
                <section className="flex justify-end gap-2">
                  <button
                    className="serviceManagementButton"
                    onClick={handleCLickCancel}
                  >
                    <img src={Cancel} alt="Cancel" />
                  </button>
                  <button
                    className="serviceManagementButton"
                    onClick={handleClickConfirm}
                  >
                    <img src={Confirm} alt="Confirm" />
                  </button>
                </section>
              </form>
            </>
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
