import { useState } from "react";
import { ServicesAPI } from "../../../../types/services";
import Expand from "/Expand.svg";
import classNames from "classnames";

type Props = {
  categories: string[];
  product: ServicesAPI;
};

const ServiceManagementProduct = ({ categories, product }: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <section className="grid rounded-3xl border px-4 py-2">
      <div className="flex justify-between">
        <p className="font-bold">{product.name}</p>
        <section>
          <button className="serviceManagementButton" onClick={handleClickOpen}>
            <img src={Expand} alt="expand" />
          </button>
        </section>
      </div>
      <section
        className={classNames("grid duration-300", {
          "grid-rows-[0fr]": !isOpen,
          "grid-rows-[1fr]": isOpen,
        })}
      >
        <div className="overflow-hidden">
          <hgroup className="flex justify-between">
            <h4>
              <b>Kategoria:</b> {product.category}
            </h4>
            <p>
              <b>Item ID:</b> {product.id}
            </p>
          </hgroup>
          <section>
            {Array.isArray(product.cost) ? (
              product.cost.map((el, i) => (
                <div>
                  <b>{product.options[i]}:</b> {el}zł
                </div>
              ))
            ) : (
              <div>
                <b>Cena:</b> {product.cost}zł
              </div>
            )}
          </section>
        </div>
      </section>
    </section>
  );
};

export default ServiceManagementProduct;
