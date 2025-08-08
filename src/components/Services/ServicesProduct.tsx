import { useState } from "react";
import { Services } from "../../types/services";
import classNames from "classnames";

type Props = {
  product: Services;
};

const ServicesProduct = ({ product }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <article
      data-testid="servicesProd"
      className="relative grid aspect-[4/5] flex-col place-items-center gap-4 rounded-2xl bg-gray-100 p-3"
    >
      <div className="flex w-full justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="mobile:size-24 size-16"
        />
      </div>

      {product.options.length ? (
        <>
          <p className="text-center font-bold">{product.name}</p>
          <article
            data-testid="servicesProd-options"
            className={classNames(
              "absolute bottom-0 z-10 flex w-full translate-y-5/6 flex-col gap-1 rounded-b-sm bg-gray-100 p-1 duration-150",
              { "pointer-events-none opacity-0": !isOpen },
            )}
          >
            {product.options.map((option, i) => {
              const productCost =
                Array.isArray(product.cost) && product.cost[i];

              return (
                <div
                  key={i}
                  className="flex w-full items-center justify-between text-sm"
                >
                  <p data-testid="data-offer" data-offer className="font-bold">
                    {option}
                  </p>
                  <p data-offer className="text-nowrap">
                    {productCost} zł
                  </p>
                </div>
              );
            })}
          </article>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="z-50 h-7 w-28 rounded-full bg-gray-200 px-2 uppercase"
          >
            {isOpen ? "ukryj" : "opcji"}
          </button>
        </>
      ) : (
        <>
          <p className="text-center font-bold">{product.name}</p>
          <p>{product.cost === 0 ? "Za darmo" : `${product.cost} zł`}</p>
        </>
      )}
    </article>
  );
};

export default ServicesProduct;
